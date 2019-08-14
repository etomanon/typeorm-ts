import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import Modal from "styled-react-modal";

import { Button } from "../../components/button/styled/Button";

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
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<"file" | "directory">("directory");
  return (
    <>
      <Flex mx={[2, 2, 0]} mb={2} flexDirection={["column", "row"]}>
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
