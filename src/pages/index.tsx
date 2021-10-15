import { useCallback, useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

import Textbox from "components/Textbox";
import Dropzone from "components/Dropzone";
import ErrorAlert from "components/ErrorAlert";
import Map from "components/map";
import IDataRow from "types/IDataRow";
import AccessibleLink from "components/AccessibleLink";

export default function Home() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IDataRow[] | null>(null);

  const getStatus = useCallback(async (taskId: string) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_HEROKU_TASKS_URL}/${taskId}`,
        // url: `http://localhost:5000/tasks/${taskId}`,
      });
      console.log(res);

      // fetch api every five seconds until api responses with file
      if (res.data.status) {
        setTimeout(() => {
          getStatus(res.data.task_id);
        }, 5000);
      } else {
        setLoading(false);
        setData(await JSON.parse(res.data));
      }
    } catch (err) {
      setTaskId(null);
      setLoading(false);
      setError("檔案格式或網路存在問題！");
    }
  }, []);

  // fetch when task_id is available
  useEffect(() => {
    if (taskId !== null) {
      getStatus(taskId);
    }
  }, [taskId, getStatus]);

  return (
    <Box mb={8} w="full">
      <Box mb={8}>
        <Box flexDirection="row" mb={2}>
          <Heading mr={2} fontSize="2xl" display="inline-block">
            使用說明
          </Heading>

          <AccessibleLink
            href={
              `${process.env.NEXT_PUBLIC_HEROKU_FILE_URL}`
              // "http://localhost:5000/file"
            }
          >
            <Text
              display="inline-block"
              textColor="#bbb"
              _hover={{ color: "inherit", textDecoration: "underline" }}
              transition="0.2s all ease-in"
            >
              下載範例檔案
            </Text>
          </AccessibleLink>
        </Box>

        <Textbox />
      </Box>

      <Box mb={20}>
        <Dropzone
          setTaskId={setTaskId}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
        />
        {error ? <ErrorAlert error={error} setError={setError} /> : null}
      </Box>

      {data ? (
        <Box mb={10}>
          <Box flexDirection="row" mb={2}>
            <Heading mr={2} fontSize="2xl" display="inline-block">
              預測結果
            </Heading>

            <AccessibleLink
              href={
                `${process.env.NEXT_PUBLIC_HEROKU_FILE_URL}/${taskId}`
                // `http://localhost:5000/file/${taskId}`
              }
            >
              <Text
                display="inline-block"
                textColor="#bbb"
                _hover={{ color: "inherit", textDecoration: "underline" }}
                transition="0.2s all ease-in"
              >
                下載完整預測資料
              </Text>
            </AccessibleLink>
          </Box>

          <Map predictedData={data} />
        </Box>
      ) : null}
    </Box>
  );
}
