import requestConfig from "../Configs/config";

export const addComment = async (commentData) => {
   return await requestConfig.post('/comment/add', commentData);
}

export const getComments = async (reqQuery) => {
   return await requestConfig.post(`/comment?itemId=${reqQuery.itemId}`);
}