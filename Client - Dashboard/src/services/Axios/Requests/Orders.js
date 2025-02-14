import requestConfig from "../Configs/config";

export const getOrders = async (reqQuery) => {
   const { projectId, page, limit, startDate, endDate } = reqQuery
   return await requestConfig.get(`/order?projectId=${projectId}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`);
}