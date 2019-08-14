import React, { useState, useEffect } from "react";
import { Flex } from "@rebass/grid";
import Modal from "styled-react-modal";

import ky from "../../ky/ky";
import { Button } from "../../components/button/styled/Button";
import { Text } from "../../components/text/Text";

import { DownloadDirectory } from "./DownloadDirectory";
import { DownloadFile } from "./DownloadFile";

interface DownloadAdminProps {
  path: string;
  loadData: () => void;
}

export const DownloadAdmin: React.FC<DownloadAdminProps> = ({
  loadData,
  path
}) => {
  // free space
  const [free, setFree] = useState<string>();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<"file" | "directory">("directory");
  useEffect(() => {
    ky.get("file/free")
      .json<any>()
      .then(res => setFree(res.free))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <Flex mx={[2, 2, 0]} mb={2} flexDirection={["column", "row"]} alignItems="center">
        <Button
          width={[1, "auto"]}
          mr={[0, 2]}
          mb={[2, 0]}
          onClick={() => {
            setForm("directory");
            setOpen(true);
          }}
        >
          Nová složka
        </Button>
        <Button
          width={[1, "auto"]}
          onClick={() => {
            setForm("file");
            setOpen(true);
          }}
        >
          Nahrát soubory
        </Button>
        {free && <Text mt={[2, 0]} ml={[0, "auto"]}>Volné místo cca {free}</Text>}
      </Flex>
      <Modal
        isOpen={open}
        onBackgroundClick={() => setOpen(prev => !prev)}
        onEscapeKeydown={() => setOpen(false)}
      >
        {form === "directory" && (
          <DownloadDirectory
            loadData={loadData}
            path={path}
            setOpen={setOpen}
          />
        )}
        {form === "file" && (
          <DownloadFile loadData={loadData} path={path} setOpen={setOpen} />
        )}
      </Modal>
    </>
  );
};
