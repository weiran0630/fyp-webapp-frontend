import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex as="footer" width="full" align="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{" "}
        <Link href="https://github.com/weiran0630" isExternal>
          github.weiran0630
        </Link>
      </Text>
    </Flex>
  );
}
