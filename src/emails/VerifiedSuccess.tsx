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

interface EmailVerifiedSuccessProps {
  name: string;
  dashboardUrl: string;
}

export function VerifiedSuccessEmail({
  name,
  dashboardUrl,
}: EmailVerifiedSuccessProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Thanks for verifying your TrenClad account</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] border-solid p-[20px]">
            <Heading className="text-[20px] text-center font-bold">
              You&apos;re all set, {name}! 🎉
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
              Welcome to TrenClad! Your email has been successfully verified,
              and you&apos;re now officially part of the crew.
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
              Here&apos;s what you do next:
            </Text>
            <ul className="list-disc list-inside text-[14px] leading-[22px] text-black mb-6">
              <li>Complete your profile for tailored experiences.</li>
              <li>Explore exclusive tools in your dashboard.</li>
              <li>Join the community and share your style.</li>
            </ul>
            <Section className="mt-[32px] mb-[32px] text-center">
              <a
                href={dashboardUrl}
                className="inline-block rounded bg-black px-5 py-3 text-white text-[12px] font-semibold no-underline"
              >
                Explore TrenClad
              </a>
            </Section>

            <Text className="text-[14px] text-black leading-[24px]">
              We&apos;re excited to have you with us! Dive in, discover
              what&apos;s trending, and make TrenClad your own.
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              TrenClad, Inc. ©2025 · All Rights Reserved
              <br />
              4R59+MW Akatsi, Volta Region, Ghana
            </Text>

            <Text className="text-[#999999] text-[12px] leading-[20px] mt-2">
              Need help getting started? Reach us at{" "}
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
