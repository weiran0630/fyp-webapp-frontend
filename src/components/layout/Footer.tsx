import { Box, Link, Text, Button } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{" "}
        <Link href="https://github.com/weiran0630" isExternal>
          weiran0630
        </Link>
      </Text>
      <Link href="https://github.com/weiran0630/fyp-webapp-frontend" isExternal>
        <Button leftIcon={<AiFillGithub />} size="xs" mt={2}>
          Open in Github
        </Button>
      </Link>
    </Box>
  );
}
