import requestConfig from "../Configs/config";

export const getItems = async () => {
   return await requestConfig.get('/item');
}

export const getSingleItem = async (reqOptions) => {
   const { itemId } = reqOptions;
   return await requestConfig.get(`/item/${itemId}`);
}