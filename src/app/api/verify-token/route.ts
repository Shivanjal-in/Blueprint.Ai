import dbConnect from "@/lib/dbConnect";
import TokenModel from "@/models/ResetToken";
import UserModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { id, token } = await req.json();
    
    if (!isValidObjectId(id))
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User!",
        },
        {
          status: 401,
        }
      );
      
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

    const resetToken = await TokenModel.findOne({ owner: user._id });
    if (!resetToken)
      return NextResponse.json(
        {
          success: false,
          message: "Token Not Found!",
        },
        {
          status: 404,
        }
      );

    const isValid = token === resetToken.token //whether the token coming from the url matches the one stored in the database
    if (!isValid)
      return NextResponse.json(
        {
          success: false,
          message: "Reset Token is not Valid!",
        },
        {
          status: 401,
        }
      );
    return NextResponse.json(
      {
        success: true,
        message: "The Reset Token Is Authenticated",
      },
      {
        status: 201,
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
