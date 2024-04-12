// import * as mongoose from "mongoose";
// const watchListSchema = new mongoose.Schema(
//   {
   
//     userId: {
//       type: String,
//       default: "",
//     },
//     partySize:{
//       type:Number,
//       default:0,
//     },
//     watchDate:{
//       type:String,
//       default:"",
//     },
//     mealType:{
//       type:String,
//       default:'',
//     },
//     restaurantId: {
//       type: String,
//       default: "",
//     },
//     restaurantName:{
//         type: String,
//         default: "",
//     },
//     availableTime:{
//       type: String,
//       default: "",
//     }

//  },
//   { timestamps: true }
// );

// watchListSchema.set("toJSON", {
//   virtuals: false,
//   transform: (doc, ret, Options) => {
//     delete ret.password;
//     delete ret.__v;
//     delete ret.accessToken;
//     //delete ret._id
//   },
// });

// export const watchLists = mongoose.model("watchLists", watchListSchema);
