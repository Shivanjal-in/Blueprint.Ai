import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, code } = await request.json();
    
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

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    }
    else if (!isCodeNotExpired){
        return NextResponse.json(
          {
            success: false,
            message: "Verification code has expired, please signup again to get a new code",
          },
          {
            status: 400,
          }
        );
    }
    else{
        return NextResponse.json(
          {
            success: false,
            message: "Incorrect Verification Code",
          },
          {
            status: 400,
          }
        );
    }
  } catch (error) {
    console.log("Error verifying user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
