import { HTTP400Error } from "../../utils/httpErrors";
// import { watchLists } from '../../db/watchList'
import { TessUtilities } from "../../utils/taskManagement";
// import mongoose = require("mongoose");
import * as bcrypt from "bcrypt";

/**
 * login api

 */
export const watchList = async (req: any, next: any) => {
  
    const { partySize, RestaurantId,userId,watchDate,MealType } = req.body;
    // let result=watchLists.create(req.body)  
  //   return TessUtilities.sendResponsData({
  //     code: 200,
  //     message: "Alert Saved Successfully",
  //     data: result,
  //   });
  // } catch (error) {
  //   next(error);
  // }
// };

// export const showWatchList = async (req: any, next: any) => {
//     try {
//       // let result=await watchLists.find({})  
//       return TessUtilities.sendResponsData({
//         code: 200,
//         message: "alert List",
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

  // export const deleteList = async (req: any, next: any) => {
  //   try {
  //     const id =req.query.id
  //     const deletedDocument = await watchLists.findByIdAndRemove(id);

  //     if (!deletedDocument) {
        
  //       return TessUtilities.sendResponsData({
  //         code: 400,
  //         message: "record not found",
        
  //       });
  //     }     
  //     let result=await watchLists.find({})  
  //     return TessUtilities.sendResponsData({
  //       code: 200,
  //       message: "alert List",
  //       data: result,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const deleteAllList = async (req: any, next: any) => {
  //   try {
  //     const id =req.query.id
  //     const deletedDocument = await watchLists.deleteMany();

  //     return TessUtilities.sendResponsData({
  //       code: 200,
  //       message: "Alert Deleted Successfully",
  //       data: []
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}