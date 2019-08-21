import React, { useState, useEffect, useCallback } from "react";
import { Flex } from "@rebass/grid";
import Modal from "styled-react-modal";
import { Refresh } from "styled-icons/material/Refresh";
import { useSnackbar } from "notistack";

import { User } from "../../types/user";
import ky from "../../ky/ky";
import { Button } from "../../components/button/styled/Button";
import { Loader } from "../../components/loader/styled/Loader";
import { Text } from "../../components/text/Text";
import { Confirm } from "../../components/confirm/Confirm";

import { DownloadDirectory } from "./DownloadDirectory";
import { DownloadFile } from "./DownloadFile";

interface DownloadAdminProps {
  path: string;
  loadData: () => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  user: User;
}

export const DownloadAdmin: React.FC<DownloadAdminProps> = ({
  loadData,
  path,
  selected,
  setSelected,
  user
}) => {
  const { enqueueSnackbar } = useSnackbar();
  // free space
  const [free, setFree] = useState<string>();
  const [openDelete, setOpenDelete] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<"file" | "directory">("directory");
  const updateFree = useCallback(() => {
    ky.get("file/free")
      .json<any>()
      .then(res => setFree(res.free))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    updateFree();
  }, [updateFree]);

  const onDeleteAll = () => {
    if (loading) return;
    setLoading(true);
    const promises = selected.map(s =>
      ky.delete("file", { json: { path: s } })
    );
    Promise.all(promises)
      .then(() => {
        enqueueSnackbar("Smazáno", { variant: "success" });
        setLoading(false);
        loadData();
      })
      .catch(() => {
        enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
        setSelected([]);
        setLoading(false);
      });
  };
  const onDownloadAll = () => {
    selected.forEach(s => window.open("file/" + s, "_blank"));
    setSelected([]);
  };
  return (
    <>
      {loading && <Loader />}
      <Flex
        mx={[2, 2, 0]}
        mt={1}
        mb={3}
        flexDirection={["column", "column", "row"]}
        alignItems="center"
      >
        {user.role === "admin" && (
          <>
            <Button
              width={[1, 1, "auto"]}
              mr={[0, 0, 2]}
              mb={[2, 2, 0]}
              onClick={() => {
                setForm("directory");
                setOpen(true);
              }}
            >
              Nová složka
            </Button>
            <Button
              width={[1, 1, "auto"]}
              mr={[0, 0, 2]}
              mb={[2, 2, 0]}
              onClick={() => {
                setForm("file");
                setOpen(true);
              }}
            >
              Nahrát soubory
            </Button>
            <Button
              width={[1, 1, "auto"]}
              mr={[0, 0, 2]}
              mb={[2, 2, 0]}
              disabled={selected.length === 0}
              onClick={() => setOpenDelete(true)}
            >
              Smaž soubory
            </Button>
          </>
        )}
        <Button
          width={[1, 1, "auto"]}
          mr={[0, 0, 2]}
          mb={[2, 2, 0]}
          disabled={selected.length === 0}
          onClick={() => setOpenDownload(true)}
        >
          Stáhni soubory
        </Button>
        {free && user.role === "admin" && (
          <Text
            display="flex"
            alignItems="center"
            pointer
            onClick={() => {
              updateFree();
              enqueueSnackbar("Volné místo aktualizováno", { variant: "info" });
            }}
            mt={[2, 0]}
            ml={[0, "auto"]}
          >
            Volné místo cca {free} <Refresh size="1.8rem" />
          </Text>
        )}
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
      <Confirm
        open={openDelete}
        setOpen={setOpenDelete}
        confirmText={`Smazat vybrané soubory? (${selected.length})`}
        onConfirm={onDeleteAll}
        error
      />
      <Confirm
        open={openDownload}
        setOpen={setOpenDownload}
        confirmText={`Stáhnout vybrané soubory? (${selected.length})`}
        onConfirm={onDownloadAll}
      />
    </>
  );
};
