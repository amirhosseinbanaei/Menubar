// axios.defaults.baseURL = 'https://menubar-api.mrtakrobot.ir/api/v1'; 
// axios.defaults.headers.common['project'] = 'menubar';
const axiosConfig = {
   baseURL: 'https://menubar-api.mrtakrobot.ir/api/v1',
   headers: {
      common: {
         'restaurantName': 'menubar',
         'restuarantName': 'menubar',
         'project': 'menubar'
      }
   }
};
export default axiosConfig