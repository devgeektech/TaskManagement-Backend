import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
// import config from "config";
import multer from "multer";
import path from "path";
import 'dotenv/config';
const cors = require('cors')
var cron = require('node-cron');
const router = express();
router.set('views', path.join(__dirname, 'views'));
router.set("view engine", "ejs");
const upload: any = multer({ dest: "temp/" });
router.use(upload.any());
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);
// const sql = require('msnodesqlv8');
import { createSqlConnection } from './services/sqlService/index'; // Import function to create SQL connection

const server = http.createServer(router);

const PORT = process.env.PORT || 3001;


//connet sql
createSqlConnection()
  .then(() => {
    console.log('SQL Server connection established successfully');
    // server.listen(PORT, () => {
    //   console.log(`Server running on port ${PORT}`);
    // });
  })
  .catch(error => {
    console.error('Failed to establish SQL Server connection:', error);
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});