import { validate } from './middleware/check';
import { NextFunction, Request, Response } from "express";
import {
  login,
  addUser,
  updateUser,
  deleteUser,
  showUser,
  addSuperAdmin
} from "./controller";
import config from "config";
import { checkAuthenticate } from "../../middleware/checks";

const basePath = config.get("BASE_PATH");
const currentPath = "auth";
const currentPathURL = basePath + currentPath;

export default [
  {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response, next: NextFunction) => {
       const result = await login(req,next);
        res.status(200).send(result);
      },
    ],
  },
{
    path: currentPathURL + "/login",
    method: "post",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await login(req,res);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: currentPathURL + "/user/add",
    method: "post",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await addUser(req,next);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: currentPathURL + "/user/update/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await updateUser(req,next);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: currentPathURL + "/user/delete/:id",
    method: "delete",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await deleteUser(req,next);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: currentPathURL + "/user",
    method: "get",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await showUser(req,next);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: currentPathURL + "/user/superAdmin",
    method: "get",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await addSuperAdmin(req,next,res);
        // res.status(200).send(result);
      },
    ],
  },
];
