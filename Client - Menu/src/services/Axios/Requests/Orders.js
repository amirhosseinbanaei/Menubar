import requestConfig from "../Configs/config";

export const getOrders = async (reqQuery) => {
   const { userId, page, limit, startDate, endDate } = reqQuery
   return await requestConfig.get(`/order?userId=${userId}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`);
}

export const addOrder = async (reqOption) => {
   const newOrderData = reqOption;
   return await requestConfig.post(`/order/add`, newOrderData);
}