import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { useSnackbar } from "notistack";

import { LoaderUpload } from "../../components/loader/styled/Loader";
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
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    files.forEach((f, i) => formData.append(`files${i}`, f));
    const req = new XMLHttpRequest();

    req.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
        setPercentage((event.loaded / event.total) * 100);
      }
    });

    req.upload.addEventListener("load", () => {
      setTimeout(() => {
        enqueueSnackbar("Nahráno", { variant: "success" });
        setLoading(false);
        loadData();
        setOpen(false);
      }, 200);
    });

    req.upload.addEventListener("error", () => {
      enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
      setLoading(false);
      setOpen(false);
    });

    req.open("POST", `api/file/upload?path=${encodeURIComponent(path)}`);
    req.send(formData);
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
            Limit 20 GB na 1 soubor
          </Text>
          {loading && <LoaderUpload width={`${percentage}%`} mb={1} mt={1} />}
          <Button width={1} mt={2} mb={2} variant="filled" disabled={loading}>
            {loading ? "Nahravám..." : "Nahrát"}
          </Button>
        </form>
      </Flex>
    </>
  );
};
