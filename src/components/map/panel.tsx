import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { stops } from "./layers";

export default function Panel() {
  const { colorMode } = useColorMode();

  return (
    <Box
      cursor="default"
      position="absolute"
      top="0"
      right="0"
      bgColor={colorMode === "light" ? "gray.200" : "gray.500"}
      opacity={0.7}
      borderRadius={6}
      borderColor={colorMode === "light" ? "gray.300" : "gray.400"}
      boxShadow=" 0 0px 3px 1px rgba(0,0,0,0.1)"
      p="12px 12px"
      m="12px"
      _hover={{ opacity: 1 }}
      transition="0.2s all ease-in"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize="sm">地區——預測錄取人數</Heading>

      <Text fontSize="smaller" mt={1.5}>
        移動游標到縣市區塊檢視詳細訊息
      </Text>

      <Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Text display="inline-block" fontSize="smaller">
            較少
          </Text>

          <Box display="inline-block" mx={1}>
            {stops.map((stop: any[]) => (
              <Box
                bgColor={stop[1]}
                width="12px"
                height="12px"
                key={stop[0]}
                display="inline-block"
                mx="1.5px"
              ></Box>
            ))}
          </Box>

          <Text display="inline-block" fontSize="smaller">
            較多
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
