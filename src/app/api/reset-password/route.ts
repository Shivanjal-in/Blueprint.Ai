import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/models/ResetToken";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { sendResetPasswordConfirmmail } from "@/helpers/sendResetPasswordConfirmEmail";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { id, password } = await request.json();
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found!",
        },
        {
          status: 404,
        }
      );
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword)
      return NextResponse.json(
        {
          success: false,
          message: "New Password Must Be Different!",
        },
        {
          status: 401,
        }
      );

    if (password.trim().length < 4)
      return NextResponse.json(
        {
          success: false,
          message: "Password must be atleast 4 characters long!",
        },
        {
          status: 401,
        }
      );
    // Check if the password contains at least 1 uppercase letter and 1 number
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

    // if (!passwordRegex.test(password.trim())) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Password must contain at least 1 uppercase letter and 1 number!",
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const newPassword = await bcrypt.hash(password.trim(),10);
    user.password = newPassword;
    await user.save();

    await TokenModel.findOneAndDelete({ owner: user._id });

    const email = user.email;
    const username = user.username;
    const updatedDate = new Date();
    const emailResponse = await sendResetPasswordConfirmmail(
      username,
      email,
      updatedDate
    );

    //! If email sending fails
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Password is changed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Internal Server error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server error",
      },
      {
        status: 500,
      }
    );
  }
}
