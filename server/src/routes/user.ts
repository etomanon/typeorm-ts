import { Router } from "express";

import * as user from "../controllers/user";

export const router = Router();

router.get("/user", user.userGetAll);

router.get("/user/:id", user.userGetId);

router.post("/user", user.userPost);

router.put("/user/:id", user.userPutId);

router.delete("/user/:id", user.userDeleteId);
