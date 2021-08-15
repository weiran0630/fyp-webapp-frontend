import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Textbox from "components/Textbox";
import Dropzone from "components/Dropzone";
import axios from "axios";
import ErrorAlert from "components/ErrorAlert";

export default function Home() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function getStatus(taskId: string) {
    try {
      const res = await axios({
        method: "GET",
        url: `https://fyp-fastapi-celery.herokuapp.com/tasks/${taskId}`,
      });
      console.log(res);

      // fetch api every five seconds until api responses with file
      if (res.data.status) {
        setTimeout(() => {
          getStatus(res.data.task_id);
        }, 5000);
      } else {
        setTaskId(null);
        setLoading(false);
        // navigate to the download link
        router.push(`https://fyp-fastapi-celery.herokuapp.com/tasks/${taskId}`);
      }
    } catch (err) {
      setTaskId(null);
      setLoading(false);
      setError("檔案格式或網路存在問題！");
    }
  }

  // fetch when task_id is available
  if (taskId !== null) {
    getStatus(taskId);
  }

  return (
    <Box mb={8} w="full">
      <Box mb={8}>
        <Heading fontSize="2xl" mb={2}>
          使用說明
        </Heading>
        <Textbox />
      </Box>
      <Dropzone
        setTaskId={setTaskId}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />
      {error ? <ErrorAlert error={error} setError={setError} /> : null}
    </Box>
  );
}
