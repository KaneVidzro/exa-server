import {
  Button,
  Html,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Tailwind,
  Head,
  Link,
  Hr,
} from "@react-email/components";


interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export function VerifyEmail({ name, verificationUrl }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview> Verify your email address</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] border-solid p-[20px]">
            <Heading className="text-[20px] text-center font-bold">
              Verify your email address
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Hi, {name}</strong> 👋
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
              Thanks for signing up for Trenclad! To get started, please confirm
              your email by clicking the button below.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={verificationUrl}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={verificationUrl}
                className="text-blue-600 no-underline"
              >
                {verificationUrl}
              </Link>
            </Text>

            <Text className="text-[#666666] text-[13px] leading-[24px]">
              If you didn&apos;t sign up for TrenClad, you can safely ignore
              this email.
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              TrenClad, Inc. ©2025 · All Rights Reserved
              <br />
              4R59+MW Akatsi, Volta Region, Ghana
            </Text>

            <Text className="text-[#999999] text-[12px] leading-[20px] mt-2">
              Need help or have questions? Reach us at{" "}
              <Link
                href="mailto:support@trenclad.com"
                className="text-blue-600 no-underline"
                target="_blank"
              >
                support@trenclad.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
