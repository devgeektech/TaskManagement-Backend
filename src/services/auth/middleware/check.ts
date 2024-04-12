import { Request, Response, NextFunction } from "express";
import { HTTP400Error, HTTP403Error } from "../../../utils/httpErrors";
import Joi, { any } from "joi";
import config from "config";
import { TessUtilities } from "../../../utils/taskManagement";
import { invalidTokenError, errorMessageHander } from "../../../utils/ErrorHandler";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can n   ot be empty",
      "string.email":`Email should be a valid email`
    }),
    password: Joi.string().trim(true).required().messages({"string.empty":"Password can not be empty"}),
    role: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    //throw new HTTP400Error(error.details);
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};

export const checkSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    fullName: Joi.string().trim(true).required().messages({
      "string.empty":"Full Name can not be empty",
    }),    
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can not be empty",
      "string.email":"Email should be a valid email"
    })
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};


export const checkForgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Password must include atleast 8 characters including 1 number and 1 special character
  const schema = Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can not be empty",
      "string.email":"Email should be a valid email"
    })
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};

export const checkOTP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Password must include atleast 8 characters including 1 number and 1 special character
  const schema = Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can not be empty",
      "string.email":"Email should be a valid email"
    }),
    otp: Joi.string().trim(true).required().messages({
      "string.empty":"OTP can not be empty"
    })
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};

export const checkPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Password must include atleast 8 characters including 1 number and 1 special character
  const schema = Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can not be empty",
      "string.email":"Email should be a valid email"
    }),
    password: Joi.string()
    .trim(true)
    .min(8)    
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))   
    .required()
    .messages({      
      "string.empty":"Password can not be empty",
      "string.min":"Password must include atleast 8 characters",
      "string.pattern.base": "Password must include atleast 1 number and 1 special character"
    })
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};

export const checkResendOTP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Password must include atleast 8 characters including 1 number and 1 special character
  const schema = Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.empty":"Email can not be empty",
      "string.email":"Email should be a valid email"
    })    
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      TessUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};

export const checkAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.get(config.get("AUTHORIZATION"));
  console.log('--token--',token)
  TessUtilities.verifyToken(token)
    .then((result) => {
      next();
    })
    .catch((error) => {
      //next()
      // throw new HTTP403Error({responseCode:403,responseMessage:error.message, data:{}});
      res
        .status(403)
        .send({ responseCode: 403, responseMessage: error.message, data: {} });
    });
};
