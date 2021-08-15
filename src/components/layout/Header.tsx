import { Box, Flex, Heading, Image } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="https://web.mcu.edu.tw/" isExternal>
        <Image src="/mcu.png" alt="Ming Chuan University" height={8} mr={2} />
      </AccessibleLink>

      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          銘傳大學AI入學預測系統
        </Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
}
