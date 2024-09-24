import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User";
import { User, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    //! Means user is not logged in
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id); //! Because aggregation pipeline needs pure mongo objectID
  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          id: userId,
        },
      },
      //! Unwinding the messages array to get each document with 1 message field
      {
        $unwind: "$messages",
      },
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },
      {
        $group: {
          //! Modifying the document with only id field and message field containing an array of messages from previous source message fields
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);
    //! Aggregation pipeline returns an array so this user variable contains an array
    if (!user || user.length === 0) {
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
    return NextResponse.json(
      {
        success: true,
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("An unexpected error occurred", error);
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 500,
      }
    );
  }
}
