import { Router } from "express";
import { subOrAdmin } from "../passport/subOrAdmin";
import { admin } from "../passport/admin";

import * as file from "../controllers/file";

export const router = Router();

router.post("/file", subOrAdmin, file.filePost);

router.post("/file/directory", admin, file.fileDirectoryPost);

router.delete("/file", admin, file.fileDelete);

router.post("/file/rename", admin, file.fileRenamePost);

router.post("/file/upload", admin, file.fileUploadPost);
