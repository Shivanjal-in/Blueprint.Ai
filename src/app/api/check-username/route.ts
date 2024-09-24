export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {

  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    //! validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
        return NextResponse.json(
            {
              success: false,
              message: "Username Already Taken",
            },
            {
              status: 400,
            }
          );
    }

    return NextResponse.json(
        {
          success: true,
          message: "Username Available",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    console.log("Error checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error Checking Username",
      },
      {
        status: 500,
      }
    );
  }
}
