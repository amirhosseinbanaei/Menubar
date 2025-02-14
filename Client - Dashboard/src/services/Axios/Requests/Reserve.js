import requestConfig from "../Configs/config";

export const getReservedTables = async () => {
   return await requestConfig.get(`/table-reserve`);
}