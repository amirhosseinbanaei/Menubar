import axios from "axios";

export const uploadImage = async (domain, reqData) => {
   return await axios.post(`${domain}/upload.php`, reqData);
}