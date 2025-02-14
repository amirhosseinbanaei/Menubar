import requestConfig from "../Configs/config";

export const getUsers = async (reqQuery) => {
   const { page, limit } = reqQuery
   return await requestConfig.get(`/user?page=${page}&limit=${limit}`);
}

export const searchUser = async (reqQuery) => {
   const { phoneNumber } = reqQuery;
   return await requestConfig.get(`/user/search?phoneNumber=${phoneNumber}`);
}