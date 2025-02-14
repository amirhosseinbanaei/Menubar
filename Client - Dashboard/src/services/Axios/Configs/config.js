import axios from "axios";
const requestConfig = axios.create({
   baseURL: 'http://localhost:6001/api',
   headers: {
      common: {
         'project': 'menubar'
      }
   }
})

requestConfig.interceptors.response.use(
   (response) => {
      return response;
   },
   (err) => {
      console.log('یه خطا تو بک اند داریم :', err);
      return Promise.reject(err)
   }
)

export default requestConfig;