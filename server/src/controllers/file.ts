import { Request, Response } from "express";
import { readdir, stat, Stats, mkdir, remove, rename } from "fs-extra";
import { join, relative } from "path";
import { sortBy } from "lodash";
import formidable from "formidable";
import checkDiskSpace from "check-disk-space";

const pathGlobal = join(__dirname, "../../files");

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const getStatsOrSubFiles = (path: string, file: string, stats: Stats) => {
  return new Promise((resolve, reject) => {
    const pathDirectory = path + "/" + file;
    if (stats.isDirectory()) {
      resolve({
        name: file,
        type: "directory",
        path: relative(pathGlobal, pathDirectory),
        size: 0
      });
      // gets items recursive
      // return readDirectory(pathDirectory).then(data => {
      //   return Promise.all(data).then(data => resolve({
      //     name: file,
      //     type: "directory",
      //     path: relative(pathGlobal, pathDirectory),
      //     size: 0,
      //     items: data
      //   }))
      // })
    }
    resolve({
      name: file,
      type: "file",
      path: relative(pathGlobal, pathDirectory),
      size: formatBytes(stats.size)
    });
  });
};

const getStat = (items: string[], path: string) => {
  const promisesStats = items.map(item => {
    const pathFile = path + "/" + item;
    const info = stat(pathFile);
    return info.then(stats => getStatsOrSubFiles(path, item, stats));
  });
  return promisesStats;
};

const readDirectory = (path: string) =>
  readdir(path).then(items => getStat(items, path));

// get whole file & folders tree in /files folder
export const filePost = async (req: Request, res: Response) => {
  const pathSearch = join(pathGlobal, "/", req.body.path);
  readDirectory(pathSearch).then(data =>
    Promise.all(data).then((data: any) => {
      const directories = sortBy(
        data.filter(d => d.type === "directory"),
        "name"
      );
      const files = sortBy(data.filter(d => d.type === "file"), "name");
      const result = [...directories, ...files];
      res.json(result);
    })
  );
};

// create directory at specified path
export const fileDirectoryPost = async (req: Request, res: Response) => {
  const pathDirectory = join(pathGlobal, "/", req.body.path);
  mkdir(pathDirectory)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// delete file or directory (even folder with content)
export const fileDelete = async (req: Request, res: Response) => {
  const pathDirectory = join(pathGlobal, "/", req.body.path);
  remove(pathDirectory)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// rename directory or file
export const fileRenamePost = async (req: Request, res: Response) => {
  const oldPath = join(pathGlobal, "/", req.body.oldPath);
  const newPath = join(pathGlobal, "/", req.body.newPath);
  rename(oldPath, newPath)
    .then(() => res.json())
    .catch(err => res.json({ err }));
};

// create file at specified path
export const fileUploadPost = async (req: Request, res: Response) => {
  const pathSub = req.query.path;
  const form = new formidable.IncomingForm();
  form.maxFileSize = 2000 * 1024 * 1024;
  form.multiples = true;
  form.parse(req);
  form
    .on("fileBegin", (name, file) => {
      file.path = `${pathGlobal}/${pathSub}/${file.name}`;
    })
    .on("error", err => {
      console.error("Error file upload", err);
      res.json({ err });
    })
    .on("end", () => {
      res.end();
    });
};

export const fileFreeGet = async (req: Request, res: Response) => {
  checkDiskSpace("/")
    .then(result => {
      res.json({
        free: formatBytes(result.free)
      });
    })
    .catch(err => res.json({ err }));
};
