import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const userGetAll = async (req: Request, res: Response) => {
  const users = await getRepository(User).find();
  res.json(users);
};

export const userGetId = async (req: Request, res: Response) => {
  const results = await getRepository(User).findOne(req.params.id);
  return res.send(results);
};

export const userPost = async (req: Request, res: Response) => {
  const user = await getRepository(User).create(req.body);
  const results = await getRepository(User).save(user);
  return res.send(results);
};

export const userPutId = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne(req.params.id);
  await getRepository(User).merge(user, req.body);
  const results = await getRepository(User).save(user);
  return res.send(results);
};

export const userDeleteId = async (req: Request, res: Response) => {
  const results = await getRepository(User).remove(req.params.id);
  return res.send(results);
};
