import requestConfig from "../Configs/config"

export const getCategories = async () => {
   return await requestConfig.get('/category');
}