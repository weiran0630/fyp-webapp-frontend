import { Box, Text, useColorMode } from "@chakra-ui/react";

export default function Textbox() {
  const { colorMode } = useColorMode();

  return (
    <Box
      bgColor={colorMode === "light" ? "gray.200" : "gray.500"}
      p={4}
      borderRadius={4}
    >
      <Text fontSize="sm">
        拖拽文件到以下拖放區或點擊選取檔案進行批次預測，處理時間視乎文件行數可能長達數分鐘，
        <span style={{ fontWeight: "bold" }}>
          **期間請勿關閉瀏覽器視窗或此分頁**。
        </span>
      </Text>
    </Box>
  );
}
