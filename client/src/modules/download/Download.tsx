import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowBack } from "styled-icons/typicons/ArrowBack";
import { useSnackbar } from "notistack";

import ky from "../../ky/ky";
import { selectorUser } from "../../redux/user/selectors";
import { Loader } from "../../components/loader/styled/Loader";

import {
  DownloadWrapper,
  DownloadHeader,
  DownloadHeaderCell,
  DownloadRow as DownloadRowStyled,
  DownloadIcon
} from "./styled/Download";
import { columns, DataProps } from "./_utils";
import { DownloadRow } from "./DownloadRow";
import { DownloadPath } from "./DownloadPath";
import { DownloadAdmin } from "./DownloadAdmin";

export const Download: React.FC<RouteComponentProps> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectorUser);
  // current directory path
  const [path, setPath] = useState("");
  // files & directories
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    setData([]);
    setLoading(true);
    ky.post("file", { json: { path } })
      .json<DataProps[]>()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
        setLoading(false);
      });
  }, [path, enqueueSnackbar]);

  const onDelete = useCallback(
    (path: string) => {
      setLoading(true);
      ky.delete("file", { json: { path } })
        .then(() => {
          enqueueSnackbar("Smazáno", { variant: "success" });
          loadData();
        })
        .catch(() => {
          enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
          setLoading(false);
        });
    },
    [enqueueSnackbar, loadData]
  );

  useEffect(() => {
    loadData();
  }, [path, loadData]);

  const onSelectPath = (i: number) => {
    const pathSelected = path
      .split("/")
      .slice(0, i + 1)
      .join("/");
    setPath(pathSelected);
  };
  return (
    <>
      {loading && <Loader />}
      {user.user && user.user.role === "admin" && (
        <DownloadAdmin loadData={loadData} path={path} />
      )}
      <DownloadPath path={path} setPath={setPath} onSelectPath={onSelectPath} />
      <DownloadWrapper>
        <DownloadHeader>
          {columns.map(c => (
            <DownloadHeaderCell key={c.path} width={c.width}>
              {c.name}
            </DownloadHeaderCell>
          ))}
        </DownloadHeader>
        {path !== "" && (
          <DownloadRowStyled onClick={() => onSelectPath(-2)}>
            <DownloadHeaderCell width={1}>
              Zpět
              <DownloadIcon>
                <ArrowBack size="2.8rem" />
              </DownloadIcon>
            </DownloadHeaderCell>
          </DownloadRowStyled>
        )}
        {data.map(d => (
          <DownloadRow
            key={d.path + d.name + d.type}
            user={user}
            data={d}
            setPath={setPath}
            onDelete={onDelete}
            path={path}
            loadData={loadData}
          />
        ))}
      </DownloadWrapper>
    </>
  );
};
