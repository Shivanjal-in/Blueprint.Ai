import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

const VerificationEmail = ({
  username = "Zethyst",
  email = "zethyst@protonmail.com",
  otp = "000000",
  company = "Blueprint.AI",
}) => {
  const previewText = `Welcome to ${company}, ${username}!`;

  return (
    <Html>
      <Head />
      <Preview>
        {previewText} Here&apos;s your verification code: {otp}
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Img
                src={`https://i.imgur.com/ZofumKm.png`}
                // src="cid:uniq-SRS.png"
                width="140"
                height="140"
                alt="Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to <strong>{company}</strong>, {username}!
            </Heading>
            <Text className="text-sm">Hello {username},</Text>
            <Row>
              <Text className="text-sm">
                Thank you for registering. Please use the following verification
                code to complete your registration:
              </Text>
            </Row>
            <Row>
              <Text className="text-sm tracking-wider"><strong>{otp}</strong></Text>
            </Row>
            <Text className="text-sm">
              We're excited to have you onboard at {company}
              We hope you enjoy your journey with us. If you have any questions
              or need assistance, feel free to reach out.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#00A3FF] py-2 px-5 rounded text-white text-xs font-semibold no-underline text-center"
                href={`${baseUrl}/verify/${email}`}
              >
                Verify Here
              </Button>
            </Section>
            <Row>
              <Text>
                If you did not request this code, please ignore this email.
              </Text>
            </Row>
            <Text className="text-sm">
              Cheers,
              <br />
              The {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// interface VerificationEmailProps {
//   username?: string;
//   email?:string;
//   otp?: string;
//   company?: string;
// }

const baseUrl = process.env.URL ? `https://${process.env.URL}` : "http://localhost:3000";

export default VerificationEmail;
