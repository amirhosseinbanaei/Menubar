import requestConfig from "../Configs/config"

export const getCategories = async () => {
   return await requestConfig.get('/category');
}

export const getSingleCategory = async (categoryId) => {
   return await requestConfig.get(`/category/${categoryId}`);
}

export const addCategory = async (postData) => {
   return await requestConfig.post('/category/add', postData)
}

export const editCategory = async (categoryId, newCategoryData) => {
   return await requestConfig.put(`/category/${categoryId}`, newCategoryData);
}