import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowBack } from "styled-icons/typicons/ArrowBack";
import { useSnackbar } from "notistack";
import { Clear } from "styled-icons/material/Clear";

import ky from "../../ky/ky";
import { selectorUser } from "../../redux/user/selectors";
import { Loader } from "../../components/loader/styled/Loader";
import { Input } from "../../components/formik/styled/Input";

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

let controller = new AbortController();

export const Download: React.FC<RouteComponentProps> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectorUser);
  // search file
  const [search, setSearch] = useState("");
  // current directory path
  const [path, setPath] = useState("");
  // files & directories
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    setData([]);
    setLoading(true);
    ky.post("file", { json: { path }, timeout: false })
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
  const onSearch = (search: string) => {
    if (!controller.signal.aborted) controller.abort();
    setLoading(true);
    controller = new AbortController();
    if (search === "") {
      loadData();
    } else {
      ky.get(`file/search?name=${encodeURIComponent(search)}`, {
        signal: controller.signal
      })
        .json<{ files: DataProps[] }>()
        .then(files => {
          setLoading(false);
          setData(files.files);
        })
        .catch(err => {
          // if request is cancelled, do nothing
          if (err.code && err.code === 20) return;
          setLoading(false);
          enqueueSnackbar("Někde se stala chyba :(", { variant: "error" });
        });
    }
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
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
            <DownloadHeaderCell key={c.path} width={c.widthHeader}>
              {c.name}
            </DownloadHeaderCell>
          ))}
          <DownloadHeaderCell ml={[0, "auto"]} width={[1, "auto"]}>
            <Input
              pr={4}
              autoComplete="off"
              name="search"
              value={search}
              type="text"
              placeholder="Vyhledat"
              required
              onChange={onChangeSearch}
            />
            <Clear
              style={{ position: "absolute", right: "1rem", cursor: "pointer" }}
              size="2.2rem"
              onClick={() => {
                setSearch("");
                loadData();
              }}
            />
          </DownloadHeaderCell>
        </DownloadHeader>
        {path !== "" && (
          <DownloadRowStyled onClick={() => onSelectPath(-2)}>
            <DownloadHeaderCell width={1}>
              Zpět
              <DownloadIcon visible>
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
