import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/models/ResetToken";
import UserModel from "@/models/User";
import createRandomBytes from "@/helpers/randomBytes";
import { NextRequest, NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/helpers/sendResetPasswordEmail";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email } = await request.json();
    const decodedEmail = decodeURIComponent(email);
    const user = await UserModel.findOne({ email: decodedEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found, Invalid request!",
        },
        {
          status: 404,
        }
      );
    }

    const token = await TokenModel.findOne({ owner: user._id });
    if (token)
      return NextResponse.json(
        {
          success: false,
          message:
            "Only after 1 hour, you can request for another email. Please have patience and be assured the email will arrive shortly",
        },
        {
          status: 401,
        }
      );

    const randomToken = await createRandomBytes();
    const resetToken = new TokenModel({
      owner: user._id,
      token: randomToken
    });
    await resetToken.save();
    const username = user.username;
    const resetPasswordLink = `http://localhost:3000/reset-password?token=${randomToken}&id=${user._id}`
    const emailResponse = await sendResetPasswordEmail(
        username,
        decodedEmail,
        resetPasswordLink
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
        message: "Password Reset Link is sent to your E-mail!",
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
