import { Box, Flex, Heading } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";
import ChakraNextImage from "components/ChakraNextImage";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Flex as="header" w="full" align="center">
      <AccessibleLink href="https://web.mcu.edu.tw/" isExternal>
        <ChakraNextImage
          src="/icon.png"
          alt="Ming Chuan University"
          w={8}
          h={8}
          mr={2}
        />
      </AccessibleLink>

      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          銘傳大學 AI 入學預測系統
        </Heading>
      </AccessibleLink>

      <Box ml="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
}
