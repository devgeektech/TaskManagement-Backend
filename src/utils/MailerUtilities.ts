

// sendMail.mjs
import * as aws from "@aws-sdk/client-ses";
import * as nodemailer from "nodemailer";
const sgMail:any = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
import * as dotenv from 'dotenv' 
dotenv.config()
export class MailerUtilities {

/**
   *
   * @param subject string
   * @param html html page
   * @param toAddresses recivers
   * @param attachments attachments
   * @returns
   */


//send email Using SendGrid    
    public static sendGridMail=async ( 
      subject:any,
      text:any,
      toAddresses:any)=>{
      var msg: any = {
        to: toAddresses,
        from: 'bruce@unlockingthemagictravel.com',
        subject: subject,
        //link: data.link,
        html:text,
      };
      return new Promise((resolve:any,reject:any)=>{
        sgMail.send(msg).then((response:any) => {
          let obj={
            responseCode:200,
            responseMessage:'Email Sent Successfully'
          }
          resolve(obj);
      }).catch((error:any)=>{
        console.log("value of err is",error)
        let obj={
          responseCode:400,
          responseMessage:error
        }
        reject(obj);
      });
    })
  } 


}