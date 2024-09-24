import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ResetPasswordConfirmEmailProps {
    username?: string;
    updatedDate?: Date;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const ResetPasswordConfirmEmail = ({
    username,
    updatedDate,
  }: ResetPasswordConfirmEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(updatedDate);
  
    return (
      <Html>
        <Head />
        <Preview>You updated the password for your Blueprint.AI account</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
            <Img
                src={`https://i.imgur.com/ZofumKm.png`}
                // src="cid:uniq-SRS.png"
                width="140"
                height="140"
                alt="Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Section style={sectionsBorders}>
              <Row>
                <Column style={sectionBorder} />
                <Column style={sectionCenter} />
                <Column style={sectionBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>Hi {username},</Text>
              <Text style={paragraph}>
                You updated the password for your <strong>Blueprint.AI</strong> account on{" "}
                {formattedDate}. If this was you, then no further action is
                required.
              </Text>
              <Text style={paragraph}>
                However if you did NOT perform this password change, please{" "}
                <Link href="http://localhost:3000/forgot-password" style={link}>
                  reset your account password
                </Link>{" "}
                immediately.
              </Text>
              <Text style={paragraph}>
                Remember to use a password that is both strong and unique to your
                Blueprint.AI account. To learn more about how to create a strong and
                unique password,{" "}
                <Link href="https://www.terranovasecurity.com/blog/how-to-create-a-strong-password-in-7-easy-steps" style={link}>
                  click here.
                </Link>
              </Text>
              <Text style={paragraph}>
                Thanks,
                <br />
                Blueprint.AI Team
              </Text>
            </Section>
          </Container>
  
          <Section style={footer}>
            <Row>
              <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
                <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
              </Column>
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
              </Column>
            </Row>
            <Row>
              <Text style={{ textAlign: "center", color: "#706a7b" }}>
                © 2024 Blueprint.AI - All Rights Reserved <br />
                KP-9C, KIIT Road, Bhubaneswar, 751024 - INDIA
              </Text>
            </Row>
          </Section>
        </Body>
      </Html>
    );
  };
  
  ResetPasswordConfirmEmail.PreviewProps = {
    username: "zethyst",
    updatedDate: new Date("June 23, 2024 4:06:00 pm UTC"),
  } as ResetPasswordConfirmEmailProps;
  
  export default ResetPasswordConfirmEmail;
  
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";
  
  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  };
  
  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  };
  
  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
  };
  
  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  };
  
  const content = {
    padding: "5px 20px 10px 20px",
  };
  
  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
  };
  
  const sectionsBorders = {
    width: "100%",
    display: "flex",
  };
  
  const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
  };
  
  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  };
  
  const link = {
    textDecoration: "underline",
  };
  