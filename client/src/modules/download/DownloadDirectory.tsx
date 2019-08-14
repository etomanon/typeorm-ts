import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { useSnackbar } from "notistack";

import ky from "../../ky/ky";

import { Loader } from "../../components/loader/styled/Loader";
import { Input } from "../../components/formik/styled/Input";
import { Text } from "../../components/text/Text";
import { Button } from "../../components/button/styled/Button";

interface DownloadDirectoryProps {
  path: string;
  loadData: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  oldValue?: string;
}

export const DownloadDirectory: React.FC<DownloadDirectoryProps> = ({
  path,
  loadData,
  setOpen,
  oldValue
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(oldValue ? oldValue : "");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const request = oldValue
      ? ky.post("file/rename", {
          json: { oldPath: `${path}/${oldValue}`, newPath: `${path}/${name}` }
        })
      : ky.post("file/directory", { json: { path: `${path}/${name}` } });
    request
      .then(() => {
        enqueueSnackbar(
          `${
            oldValue ? `${oldValue} přejmenováno na` : "Vytvořena složka"
          } ${name}`,
          { variant: "success" }
        );
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
          {oldValue ? "Přejmenovat" : "Nová složka"}
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
            name="name"
            value={name}
            width={1}
            type="text"
            placeholder="Název"
            required
            onChange={e => setName(e.currentTarget.value)}
          />
          <Button width={1} mt={2} mb={2} variant="filled">
            {oldValue ? "Přejmenovat" : "Vytvořit"}
          </Button>
        </form>
      </Flex>
    </>
  );
};
