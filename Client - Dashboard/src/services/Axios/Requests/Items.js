import requestConfig from "../Configs/config";

export const getItems = async () => {
   return await requestConfig.get('/item');
}

export const getSingleItem = async (reqQuery) => {
   return await requestConfig.get(`/item/${reqQuery.itemId}`);
}

export const addItem = async (postData) => {
   return await requestConfig.post('/item/add', postData)
}

export const addItemWithExcel = async (postData) => {
   return await requestConfig.post('/item/add/excel-file', postData)
}

export const editItem = async (reqQuery) => {
   // console.log(reqQuery)
   return await requestConfig.put(`/item/${reqQuery.itemId}`, reqQuery.itemData);
}