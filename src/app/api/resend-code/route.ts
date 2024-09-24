import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //! Connect database
  await dbconnect();
  const verifyCode = Math.floor(1000 + Math.random() * 9000).toString(); //generates 4 digit random code
  try {
    const { email } = await request.json();

    const decodedEmail = decodeURIComponent(email);
    const user = await UserModel.findOne({ email: decodedEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    user.verifyCode = verifyCode;
    await user.save();
    //! Send verification email
    const emailResponse = await sendVerificationEmail(
      decodedEmail,
      user.username,
      verifyCode
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

    //* When all the above processes are successful
    return NextResponse.json(
      {
        success: true,
        message: "OTP Sent Successfully. Please Check Your Email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error sending otp", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error Sending OTP",
      },
      {
        status: 500,
      }
    );
  }
}
