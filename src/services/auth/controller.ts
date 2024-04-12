import { HTTP400Error } from "../../utils/httpErrors";
import config from "config";
// import { users } from "../../db/User";
import { TessUtilities } from "../../utils/taskManagement";
import * as bcrypt from "bcrypt";
import ejs from "ejs";
import moment from "moment";
import { MailerUtilities } from "../../utils/MailerUtilities";
import sql from 'mssql';

const siteUrl = config.get("SITE_URL");
/**
 * login api
 */
export const login = async (req: any, res:any) => {
  try {
   const { email, password } = req.body;
   const result:any = await sql.query`
   SELECT * 
   FROM Users
   WHERE Email=${email}`
   
   if(result.recordset.length==0)
   {
    let obj={
      status:400,
      message:"Invalid Email",
    }
    return res.status(400).send(obj);
   }
    
    if(result.recordset.length>0){
      const pass=result.recordset[0].password
      const passwordMatch = await bcrypt.compare(password, pass);
      if (!passwordMatch) {
        let obj={
          status:400,
          message:"Invalid password",
        }
        return res.status(400).send(obj);
      }
      let userToken = await TessUtilities.createJWTToken({
        firstName: result.recordset[0].firstName,
        lastName: result.recordset[0].lastName,
        email: result.recordset[0].email,
        role: result.recordset[0].role,
        id: result.recordset[0].id,
        expiresIn: '365d'
      });
      let data={
        accessToken: userToken,
        email: result.recordset[0].email,
        role: result.recordset[0].role,
      }
      console.log("dastas is",data)
      return TessUtilities.sendResponsData({ code: 200, message: 'Success', data: data });
      

    }
  } catch (error) {
    res.send(error);
  }
}; 

//User List
export const showUser = async (req: any, next: any) => {
  try {
   const user:any = await sql.query`
      SELECT Id, firstName, lastName, email, role
      FROM Users  WHERE role != 'superAdmin'`;

    if (user.recordset.length === 0) {
      throw new HTTP400Error(
        TessUtilities.sendResponsData({
          code: 404,
          message: "User not found",
        })
      );
    }
    

    const userData = {
      Id:user.recordset[0].Id,
      firstName: user.recordset[0].firstName,
      lastName: user.recordset[0].lastName,
      email: user.recordset[0].email,
      role: user.recordset[0].role
    };

    return TessUtilities.sendResponsData({ 
      code: 200, 
      message: 'User details retrieved successfully',
      data: user.recordset
    });

  } catch (error) {
    next(error);
  }
};

//addAdmin
export const addSuperAdmin=async(req:any,next:any,res:any)=>{
  try{

  
  const hashedPassword = await bcrypt.hash("Qwerty@1", 10);
  const data={
    email:"admin@gmail.com",
    password:hashedPassword,
    fisrtName:"Admin",
    lastName:"User",
    role:"admin",

  }
  const createTableQuery = `
  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
  BEGIN
    CREATE TABLE [dbo].[Users] (
      [id] INT IDENTITY(1,1) PRIMARY KEY,
              [email] varchar(255) NOT NULL,
              [password] varchar(255) NOT NULL,
              [firstName] varchar(255) NOT NULL,
              [lastName] varchar(255) NOT NULL,
              [role] varchar(255) NOT NULL,
              CONSTRAINT UC_Email UNIQUE(email) -- Unique constraint on email column
    )
  END
`;
await sql.query(createTableQuery)
const insertDataQuery = `
INSERT INTO [dbo].[Users] (email, password, firstName, lastName, role)
VALUES ('admin@gmail.com', '${hashedPassword}', 'Admin', 'User', 'admin')
`;
const result=await sql.query(insertDataQuery)
return res.send({ code: 200, message: "Data inserted successfully", data: data });
  }
  catch(err){
    console.log("err",err)
    return res.send({ code: 500, message: err });

  }
}

//adduser
export const addUser = async (req: any, next: any) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    console.log(req.body);

    const existingUser:any = await sql.query`
      SELECT * 
      FROM Users 
      WHERE Email=${email}
    `;
    if(existingUser.recordset.length > 0) {
      throw new HTTP400Error(
        TessUtilities.sendResponsData({
          code: 400,
          message: "Email already exists",
        })
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const result:any = await sql.query`
      INSERT INTO Users (Email, Password, FirstName, LastName, Role)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${role})
    `;

    return TessUtilities.sendResponsData({ 
      code: 200, 
      message: 'User added successfully',
      data: { email, firstName, lastName, role } 
    });

  } catch (error) {
    next(error);
  }
};


//UPDATE USER
export const updateUser = async (req: any, next: any) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const  id  = req.params.id

    const user:any = await sql.query`
      SELECT * 
      FROM Users 
      WHERE id=${id}
    `;

    if (user.recordset.length === 0) {
      throw new HTTP400Error(
        TessUtilities.sendResponsData({
          code: 404,
          message: "User not found",
        })
      );
    }
    

    // If a password is provided, hash it. Otherwise, keep the existing password.
    let hashedPassword = user.recordset[0].password;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user details in the database
    // Note: Ensure your SQL library supports parameterized queries to prevent SQL injection
    const result:any = await sql.query`
      UPDATE Users
      SET 
        Password = ${hashedPassword}, 
        firstName = ${firstName || user.recordset[0].firstName},
        lastName = ${lastName || user.recordset[0].lastName},
        Role = ${role || user.recordset[0].role}
      WHERE Email = ${email}
    `;

    // Return success response
    return TessUtilities.sendResponsData({ 
      code: 200, 
      message: 'User updated successfully',
    });

  } catch (error) {
    next(error);
  }
};


//Delete User
export const deleteUser = async (req: any, next: any) => {
  try {
    const  id  = req.params.id
    const user:any = await sql.query`
      SELECT * 
      FROM Users 
      WHERE id=${id}
    `;

    if (user.recordset.length === 0) {
      throw new HTTP400Error(
        TessUtilities.sendResponsData({
          code: 404,
          message: "User not found",
        })
      );
    }
    console.log(user.recordset);
 
    const result:any = await sql.query`
      DELETE FROM Users
      WHERE id = ${id}
    `;

    return TessUtilities.sendResponsData({ 
      code: 200, 
      message: 'User deleted successfully',
    });

  } catch (error) {
    next(error);
  }
};