import { HTTP400Error } from "../../utils/httpErrors";
import config from "config";
import { TessUtilities } from "../../utils/taskManagement";
import * as bcrypt from "bcrypt";
import ejs from "ejs";
import moment from "moment";
import { MailerUtilities } from "../../utils/MailerUtilities";
import sql from 'mssql';
import { Console } from "console";

export const task = async (req: any, res: any,) => {
  try {
    const records1 = req.body
    const taskId=req.query.taskId
    const  id  = req.params.id
    console.log("records1: " + records1)
    const uid = req.params.user.id
    const result: any = await sql.query`
        SELECT * 
        FROM taskHistory WHERE taskId =${taskId}`;
    console.log("valur of result is",result)
    if (result.recordset.length == 0) {
      throw new HTTP400Error(
        TessUtilities.sendResponsData({
          code: 404,
          message: "User not found",
        })
      );
    }
    const records = result.recordset;
    return res.send({ code: 200, message: 'Success', data: records });

  } catch (error) {
    res.send(error);
  }
}

//add Task
export const add = async (req: any, res: any,) => {
  try {
    console.log("req.bodyddata ius", req.body)
    const { totalTime, taskType, user } = req.body
    const uid = user.id
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[task]') AND type in (N'U'))
        BEGIN
          CREATE TABLE [dbo].[task] (
            [id] INT IDENTITY(1,1) PRIMARY KEY,
            [totalTime] INT,
            [taskType] varchar(255) NOT NULL,
            [uid] INT
          )
        END
      `;
    await sql.query(createTableQuery)
    const insertDataQuery = `
            INSERT INTO [dbo].[task] (totalTime, taskType,uid)
            VALUES ('${totalTime}', '${taskType}','${uid}')
        `;
    const result = await sql.query(insertDataQuery)
    const lastRecords = `SELECT TOP 1 id, taskType
    FROM task
    ORDER BY id DESC;`
    const tasklist = await sql.query(lastRecords)
    return res.send({ code: 200, message: "Data inserted successfully", data: tasklist.recordset[0] });

  } catch (error) {
    console.log("errois", error)
    return res.send({ code: 500, message: error });
  }
}

//task history
export const addTaskHistory = async (req: any, res: any) => {
  try {
    const { totalTime, taskType, startTime, endTime, taskId } = req.body[0]
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[taskHistory]') AND type in (N'U'))
        BEGIN
          CREATE TABLE [dbo].[taskHistory] (
            [id] INT IDENTITY(1,1) PRIMARY KEY,
            [totalTime] varchar(255) NOT NULL,
            [taskType] varchar(255) NOT NULL,
            [startTime] varchar(255) NOT NULL,
            [endTime] varchar(255) NOT NULL,
            [taskId]  INT,
          )
        END
      `;
    await sql.query(createTableQuery)
    const insertDataQuery = `
            INSERT INTO [dbo].[taskHistory] (totalTime, taskType,startTime,endTime,taskID)
            VALUES ('${totalTime}', '${taskType}','${startTime}','${endTime}','${taskId}')
        `;
    await sql.query(insertDataQuery)
    return res.send({ code: 200, message: "Data inserted successfully" });

  } catch (error) {
    console.log("errois", error)
    return res.send({ code: 500, message: error });
  }
}

//all task
export const allTask = async (req: any, res: any) => {
  try {
    const uid = req.params.user.id
    const createTableQuery =await sql.query`
    SELECT * FROM task WHERE uid=${uid}
    `;
    const records=createTableQuery.recordset
    return res.send({ code: 200, message: "Data Compiled",data:records });

  } 
  catch (error) {
    console.log("errois", error)
    return res.send({ code: 500, message: error });
  }
}