import axios from 'axios'

export const setTokenHeader = (token) => {
   if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
   }
   else{
      delete axios.defaults.headers.common['Authorization']
   }
}
export const apiCall = async (method, path, data) => {
   try {
    const response = await axios[method](path, data);
    return response.data;
   } catch (error) {
    //    console.log(error.response.data.message);
       return error.response.data;
       
   }
}