import React, { useState } from "react";
import { FileBlank } from "styled-icons/boxicons-regular/FileBlank";
import { FolderOpen } from "styled-icons/boxicons-regular/FolderOpen";
import { get } from "lodash";
import { Delete } from "styled-icons/material/Delete";
import { Edit } from "styled-icons/material/Edit";
import Modal from "styled-react-modal";
import { Confirm } from "../../components/confirm/Confirm";

import { UserState } from "../../redux/user/reducers";
import {
  DownloadRow as DownloadRowStyled,
  DownloadCell,
  DownloadIcon
} from "./styled/Download";
import { columns, DataProps } from "./_utils";
import { DownloadDirectory } from "./DownloadDirectory";

interface DownloadRowProps {
  user: Readonly<UserState>;
  data: DataProps;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (path: string) => void;
  path: string;
  loadData: () => void;
}

export const DownloadRow: React.FC<DownloadRowProps> = ({
  data,
  setPath,
  user,
  onDelete,
  path,
  loadData
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const onClick = () => {
    if (data.type === "directory") {
      setPath(data.path);
    } else {
      window.open("file/" + data.path, "_blank");
    }
  };
  const handleDelete = () => {
    onDelete(data.path);
  };
  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <DownloadRowStyled key={data.path + data.name} onClick={onClick}>
        {columns.map(c => (
          <React.Fragment key={c.path}>
            {data.type === "directory" && c.path === "size" ? null : (
              <DownloadCell width={c.width}>
                <DownloadIcon visible mr={1}>
                  {c.path === "name" ? (
                    data.type === "directory" ? (
                      <FolderOpen size="2.8rem" />
                    ) : (
                      <FileBlank size="2.8rem" />
                    )
                  ) : null}
                </DownloadIcon>
                {get(data, c.path)}
              </DownloadCell>
            )}
          </React.Fragment>
        ))}
        {user.user && user.user.role === "admin" && (
          <DownloadCell ml={["0", "auto"]}>
            <DownloadIcon
              onClick={e => {
                e.stopPropagation();
                setOpenDelete(true);
              }}
              color="error"
              mr={["auto", 3]}
            >
              <Delete size="2.8rem" />
            </DownloadIcon>
            <DownloadIcon onClick={handleEdit}>
              <Edit size="2.8rem" />
            </DownloadIcon>
          </DownloadCell>
        )}
      </DownloadRowStyled>
      <Modal
        isOpen={open}
        onBackgroundClick={() => setOpen(prev => !prev)}
        onEscapeKeydown={() => setOpen(false)}
      >
        <DownloadDirectory
          loadData={loadData}
          path={path}
          setOpen={setOpen}
          oldValue={data.name}
        />
      </Modal>
      <Confirm
        open={openDelete}
        setOpen={setOpenDelete}
        confirmText={`Opravdu chcete smazat ${data.name}?`}
        onConfirm={handleDelete}
      />
    </>
  );
};
