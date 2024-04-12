import jwt from "jsonwebtoken";
import config from "config";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { users } from "../db/User";
import { HTTP400Error, HTTP404Error, HTTP403Error } from "./httpErrors";
import { invalidTokenError } from "./ErrorHandler";
import { access } from "fs";

export class TessUtilities {

  /**
   * Return response in custom format
   * @param response
   */
  public static sendResponsData(response: any) {
    let result: any = {
      responseCode: response.code,
      responseMessage: response.message,
    };
    if (response.data) {
      result.data = response.data;
    }
    if (response.totalRecord) {
      result.totalRecord = response.totalRecord;
    }
    return result;
  }

  /**
   * Generate encrypted password
   * @param {string} password
   */
  public static cryptPassword = async (password: string) => {
    return new Promise(function (resolve, reject) {
      return bcrypt.hash(
        password,
        config.get("SALT"),
        (err: any, hash: any) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(hash);
          }
        }
      );
    });
  };

  /**
   * Verify password
   * @param {string} password
   */
  public static VerifyPassword = async (password: string, hash: string) => {
    return new Promise(function (resolve, reject) {
      return bcrypt.compare(password, hash, (error: any, result: any) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  };

  /**
   * Create jwt token
   * @param {object} payload
   * @param {string} token - return token
   */
  public static createJWTToken = async (payload: any) => {
    return jwt.sign(payload, config.get("JWT_SECRET_KEY"), {});
  };

  /**
   * Verify token is valid or not
   * @param {string} token
   */
  public static verifyToken = async (token: any) => {
    const tokenWithoutBearer = token.split(' ')[1]

   return new Promise(function (resolve, reject) {
      jwt.verify(
        tokenWithoutBearer,
        config.get("JWT_SECRET_KEY"),
        async function (error: any, result: any) {
          if (error) {
            console.log("error",error)
            return reject(error);
          } else {
            return resolve(result);
             }
        }
      );
    })
    console.log('datais',data)
  };

  /**
   * decoded jwt token
   * @param token string
   */
  public static getDecoded = async (token: any) => {
    return jwt.decode(token);
  };

  /**
   * check Super admin or sub admin
   * @param token string
   */
  public static isAdmin = async (token: any) => {
    const decoded: any = await TessUtilities.getDecoded(token);

    if (
      decoded.user_type === "Super-Admin" ||
      decoded.user_type === "Sub-Admin"
    )
      return true;
    return false;
  };

  /**
   * Generate alphanumer random string of given length
   * @param length
   */
  public static genAlphaNumericCode(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * 
   * @param length of otp we want to generate
   * @returns numeric code for specified length
   */
  public static genNumericCode(length: number) {
    let min = Math.pow(10, length - 1);
    let max = (Math.pow(10, length) - Math.pow(10, length - 1) - 1);
    return Math.floor(min + Math.random() * max)
  }

}
