"use server";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import SRSModel from "@/models/SRS";
import axios, { AxiosError } from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const BaseURL = "http://localhost:5000"
const BaseURL = "https://blueprint-ai-backend.onrender.com"

export async function POST(req: NextRequest) {
  try {
    const {
      main,
      selectedPurpose,
      selectedTarget,
      selectedKeys,
      selectedPlatforms,
      selectedIntegrations,
      selectedPerformance,
      selectedSecurity,
      selectedStorage,
      selectedEnvironment,
      selectedLanguage,
    } = await req.json();

    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !session.user) {
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
    const generationConfig = {
      stopSequences: ["red"],
      maxOutputTokens: 20000,
      temperature: 0.8,
      topP: 0.07,
      topK: 30,
    };
    // Initiate the SRS generation process
    setTimeout(async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, generationConfig);

      const prompt = `
        Generate an SRS document. The main idea is "${main}". The primary purpose of the software product is "${selectedPurpose}". The target users are "${selectedTarget}". The key features are "${selectedKeys}". The platforms that the software will be compatible with are "${selectedPlatforms}". The other software/system that it needs to integrate with are "${selectedIntegrations}". The performance requirements are "${selectedPerformance}". The security requirements or compliance standards that the software must meet are "${selectedSecurity}". The data capacity that it will need is "${selectedStorage}". The expected environments in which the software will operate are "${selectedEnvironment}". The language and localization that the software will support are "${selectedLanguage}". For new line, use '\n' in the text, and don't use # hash. Provide a suitable title for the software based on the main idea and write it like Title:[title generated] at the top of the text and format the rest of the document appropriately.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

       // Extract the title from the generated text
      const titleMatch = text.match(/Title:\s*(.*)/);
      let title = titleMatch ? titleMatch[1].trim() : "SRS DOCUMENT";
      // Remove asterisks from the title
      title = title.replace(/\*\*/g, "");
      // Remove the "Title:" line from the text
      const modifiedText = text.replace(/Title:\s*.*\n?/, "");
      let descriptionArray = [
        main,
        selectedPurpose,
        selectedTarget,
        selectedKeys,
        selectedPlatforms,
        selectedIntegrations,
        selectedPerformance,
        selectedSecurity,
        selectedStorage,
        selectedEnvironment,
        selectedLanguage,
      ];

      const { data } = await axios.post(`${BaseURL}/generate-pdf`, {
        title,
        text: modifiedText,
        username: user?.username,
      });
      
      if (data.success) {
        const newSRS = new SRSModel({
          owner: user?._id,
          name: title,
          description: JSON.stringify(descriptionArray),
          status: "Completed",
          pdf_url: data.pdfName,
          word_url: data.wordName,
        });
        await newSRS.save();
      }
      else{
        const newSRS = new SRSModel({
          owner: user?._id,
          name: title,
          description: JSON.stringify(descriptionArray),
          status: "Failed",
          pdf_url: "No PDF",
          word_url: "No Docx",
        });
        await newSRS.save();
        return NextResponse.json(
            {
              success: false,
              message: "Error Generating SRS",
            },
            {
              status: 401,
            }
          );
      }
    }, 0); // Run asynchronously

    return NextResponse.json(
      {
        success: true,
        message: "SRS Generation Initiated",
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
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
