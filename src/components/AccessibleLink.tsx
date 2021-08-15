import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";

type AccessibleLinkProps = LinkProps & ChakraLinkProps;

export default function AccessibleLink({
  href,
  isExternal,
  children,
  as,
}: AccessibleLinkProps) {
  return (
    <Link href={href} as={as} passHref>
      <ChakraLink isExternal={isExternal}>{children}</ChakraLink>
    </Link>
  );
}
