const sharp = require("sharp");

export class ImageUtilites {
  public static getMetaData = async (file: any) => {
    try {
      const metadata = await sharp(file).metadata();
      return metadata;
    } catch (error) {
      console.log(`An error occurred during processing: ${error}`);
    }
  };

  public static getFileExtention = async (filename: any) => {
    return filename.split(".").pop();
  };

  public static resizeImage = async (file: any) => {
    try {
      return await sharp(file)
        .resize({ width: 100 })
        .toFormat("webp");
      // .toFile("new-file.webp")
      // .then(function (info:any) {
      //   console.log(info);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
