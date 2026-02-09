import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
const uploadImage=async(imageFile)=>{
    const formData=new FormData();
    //append of image file to formdata
    formData.append("image",imageFile);
    try{
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type':'multipart/form-data' //set headers for file uploads...
            }

        })
        return response.data;
    }catch(err){
        console.error("Error uploading the image",error);
        throw error;

    }
}
export default uploadImage;