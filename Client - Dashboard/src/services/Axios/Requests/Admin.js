import requestConfig from "../Configs/config";

export const loginAdmin = async (data) => {
   return await requestConfig.post('/admin/login', data);
}