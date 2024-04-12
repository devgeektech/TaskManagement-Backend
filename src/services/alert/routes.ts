// import { NextFunction, Request, Response } from "express";
// // import {
 
// //  watchList, 
// // } from "./controller";
// import config from "config";
// const basePath = config.get("BASE_PATH");
// const currentPath = "auth";
// const currentPathURL = basePath + currentPath;
// export default [
//   // add watchList  //
//   {
//     path: currentPathURL + "/watchList",
//     method: "post",
//     handler: [
//       //validate,
//       async (req: Request, res: Response, next: NextFunction) => {
//         const result = await watchList(req,next);
//         res.status(200).send(result);
//       },
//     ],
//   },
//   //get watchList
//   {
//     path: currentPathURL + "/watchList",
//     method: "get",
//     handler: [
//       //validate,
//       async (req: Request, res: Response, next: NextFunction) => {
//         const result = await showWatchList(req,next);
//         res.status(200).send(result);
//       },
//     ],
//   },
//   //delete watchList
//   // {
//   //   path: currentPathURL + "/watchList",
//   //   method: "delete",
//   //   handler: [
//   //     //validate,
//   //     async (req: Request, res: Response, next: NextFunction) => {
//   //       const result = await deleteList(req,next);
//   //       res.status(200).send(result);
//   //     },
//   //   ],
//   // },
//   // {
//   //   path: currentPathURL + "/watchList/all",
//   //   method: "delete",
//   //   handler: [
//   //     //validate,
//   //     async (req: Request, res: Response, next: NextFunction) => {
//   //       const result = await deleteAllList(req,next);
//   //       res.status(200).send(result);
//   //     },
//   //   ],
//   // },

// ];
