import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="切換深色/淺色主題"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      variant="ghost"
      onClick={toggleColorMode}
    />
  );
}
