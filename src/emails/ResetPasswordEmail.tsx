import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Link,
} from "@react-email/components";

interface ResetPasswordSuccessEmailProps {
  name: string;
  loginUrl: string;
}

export function ResetPasswordEmail({
  name,
  loginUrl,
}: ResetPasswordSuccessEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Password successfully reset</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] border-solid p-[20px]">
            <Heading className="text-[20px] text-center font-bold">
              Password Reset Successful
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Hi, {name}</strong> 👋
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
              Your password has been successfully updated. You can now log in
              with your new credentials.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
              <a
                href={loginUrl}
                className="inline-block rounded bg-black px-5 py-3 text-white text-[12px] font-semibold no-underline"
              >
                Go to Login
              </a>
            </Section>

            <Text className="text-[14px] text-black leading-[24px]">
              If you didn&apos;t perform this action, please contact our support
              team immediately.
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
