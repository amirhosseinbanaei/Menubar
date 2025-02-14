import requestConfig from "../Configs/config";

export const addTableReserve = async (reservedTableData) => {
   return await requestConfig.post('/table-reserve/add', reservedTableData);
}