import { useCallback } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Flex, Button, useColorMode } from "@chakra-ui/react";

interface DropzoneProps {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  setTaskId: (taskId: string | null) => void;
  setError: (error: string | null) => void;
}

export default function Dropzone({
  loading,
  setLoading,
  setTaskId,
  setError,
}: DropzoneProps) {
  const { colorMode } = useColorMode();

  const onDrop = useCallback(
    (acceptedFiles) => {
      let formData = new FormData();
      formData.append("uploadfile", acceptedFiles[0]);

      axios({
        method: "POST",
        url: "https://fyp-fastapi-celery.herokuapp.com/predict",
        data: formData,
      })
        .then((res) => {
          // force batch update to prevent extra render
          unstable_batchedUpdates(() => {
            setTaskId(res.data.task_id);
            setLoading(true);
          });
        })
        .catch((err) => {
          setTaskId(null);
          setError(err.message);
        });
    },
    [setTaskId, setError, setLoading]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xlsx",
    disabled: loading,
  });

  return (
    <div {...getRootProps({ className: "dropzone disabled" })}>
      <Flex
        flexDirection="column"
        alignItems="center"
        py={40}
        borderWidth={4}
        borderRadius={2}
        borderStyle="dashed"
        borderColor={colorMode === "light" ? "gray.300" : "gray.400"}
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        outline="none"
      >
        <input {...getInputProps()} formEncType="multipart/form-data" />
        {isDragActive ? (
          <p>拖拽檔案到此...</p>
        ) : (
          <>
            {loading ? null : <p>拖拽檔案到此，或者</p>}
            <Button
              colorScheme={loading ? "" : "teal"}
              mt={2}
              isLoading={loading}
              loadingText="文件處理中..."
              variant={loading ? "ghost" : "solid"}
            >
              點擊選取檔案
            </Button>
          </>
        )}
      </Flex>
    </div>
  );
}
