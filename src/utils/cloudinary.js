import {v2 as cloudinary} from "cloudnary"
import fs from "fs"

  cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath)return null
        //upload the file on cloudianry
        const response = await uploadOnCloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
       
    //file has been uploaded succesfull
    console.log("file is uploaded on cloudinary",response.url);
    return response;
}catch(error){
    FileSystem.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
     return null;
    }
}
    /////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try  {// Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};