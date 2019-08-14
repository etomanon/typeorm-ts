import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { useSnackbar } from "notistack";

import ky from "../../ky/ky";

import { Loader } from "../../components/loader/styled/Loader";
import { Input } from "../../components/formik/styled/Input";
import { Text } from "../../components/text/Text";
import { Button } from "../../components/button/styled/Button";

interface DownloadFileProps {
  path: string;
  loadData: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DownloadFile: React.FC<DownloadFileProps> = ({
  path,
  loadData,
  setOpen
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    files.forEach((f, i) => formData.append(`files${i}`, f));
    ky.post(`file/upload?path=${encodeURIComponent(path)}`, {
      body: formData
    })
      .then(() => {
        enqueueSnackbar("Nahráno", { variant: "success" });
        setLoading(false);
        loadData();
        setOpen(false);
      })
      .catch(() => {
        enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
        setLoading(false);
        setOpen(false);
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (currentTarget && currentTarget.files) {
      const files = Array.from(currentTarget.files);
      setFiles(files);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Flex
        px={2}
        width={["95%", "35rem"]}
        backgroundColor="#fff"
        flexDirection="column"
        alignItems="center"
        style={{ borderRadius: "4px" }}
      >
        <Text mt={2} mb={path !== "" ? 0 : 2} fontSize={3}>
          Nahrát soubor/y
        </Text>
        {path !== "" && (
          <Text mt={2} mb={2} fontSize={1}>
            Adresář: {path}
          </Text>
        )}
        <form onSubmit={onSubmit}>
          <Input
            autoFocus
            autoComplete="off"
            name="files"
            width={1}
            type="file"
            multiple
            placeholder="Název"
            required
            onChange={onChange}
          />
          <Text mt={2} mb={2} fontSize={1} textAlign="center" width={1}>
            Limit 2 GB na 1 soubor
          </Text>
          <Button width={1} mt={2} mb={2} variant="filled">
            Nahrát
          </Button>
        </form>
      </Flex>
    </>
  );
};
