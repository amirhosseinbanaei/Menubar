import requestConfig from "../Configs/config"
export const editProjectData = async (projectDate) => {
   return await requestConfig.post(`/project/create`, projectDate);
}