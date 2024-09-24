import { resend } from "@/lib/Resend";
import { render } from '@react-email/render';
import { APIResponse } from "@/types/APIResponse";
import nodemailer from "nodemailer"
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<APIResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "contact.akshat.jaiswal@gmail.com",
        pass: "vyhhnbphhwgesbbg", //got the password from google account itself inside App Passwords
      },
    });
    const emailHtml = render(VerificationEmail({ username, email, otp: verifyCode }))

    const sendMessage = async()=>{
      await transporter.sendMail({
        from: '"Blueprint.AI" <contact.akshat.jaiswal@gmail.com>', 
        to: email,
        subject: "Verification Code | Blueprint.AI", 
        html:  emailHtml,
        // attachments: [
        //   {
        //     filename: "SRS.png",
        //     path: `${process.env.NEXT_PUBLIC_URL}/SRS.png`,
        //     cid: "uniq-SRS.png",
        //   },
        // ],
      });
    }
    await sendMessage();

    // resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "Verification Code | Blueprint.AI",
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.log("Error sending email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
