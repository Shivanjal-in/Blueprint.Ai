import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  username?: string;
  Id?:string;
  token?:string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmail = ({
  username,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Password | Blueprint.AI</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://i.imgur.com/ZofumKm.png`}
            // src="cid:uniq-SRS.png"
            width="140"
            height="140"
            alt="Logo"
            style={image}
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Blueprint.AI
              account. If this was you, you can set a new password here:
            </Text>
            <Section className="text-center mt-[12px] mb-[12px] mx-auto">
              <Button style={button} href={resetPasswordLink}>
                Reset password
              </Button>
            </Section>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text >Happy Automating!</Text>
          </Section>
          <Text style={text}>
              Best Regards,
              <br />
              The Blueprint.AI Team
            </Text>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  username: "Zethyst",
  resetPasswordLink: "http://localhost:3000/reset-password",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const image = {
  margin: "1px auto"
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "6px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  padding: "12px 5px",
};

const anchor = {
  textDecoration: "underline",
};
