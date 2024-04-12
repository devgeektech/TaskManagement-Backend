import { NextFunction, Request, Response } from "express";
import { add, addTaskHistory, task, allTask } from "./controller";
import config from "config";

const basePath = config.get("BASE_PATH");
const currentPath = "auth";
const currentPathURL = basePath + currentPath;
import { checkAuthenticate } from "../../middleware/checks";

export default [

  {
    path: currentPathURL + "/tasks",
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await task(req, res);
      },
    ],
  },

  {
    path: currentPathURL + "/add",
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await add(req, res);
      },
    ],
  },
  {
    path: currentPathURL + "/taskhistory/add",
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await addTaskHistory(req, res);
      },
    ],
  },
  {
    path: currentPathURL + "/alltask",
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await allTask(req, res);
      },
    ],
  }
]