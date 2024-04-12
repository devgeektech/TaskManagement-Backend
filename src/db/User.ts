import * as mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    otp:{
      type:Number,
      default:0,
    },
    emailVerified:{
      type:Boolean,
      default:false,
    },
    otpExipredAt:{
      type:String,
      default:'',
    },
    accessToken:{
      type:String,
      default:'',
    },
    planId:{
      type:String,
      default:''
    },
    subscribeId:{
      type:String,
      default:''
    }
 },
  { timestamps: true }
);

userSchema.set("toJSON", {
  virtuals: false,
  transform: (doc, ret, Options) => {
    delete ret.password;
    delete ret.__v;
    delete ret.accessToken;
    //delete ret._id
  },
});

export const users = mongoose.model("users", userSchema);
