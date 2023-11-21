import axios from "axios"




const headers = {
  
    'Content-Type': 'application/json',
    'Accept':'application/json',
  
  };

// 192.168.0.106
// 10.109.71.20
 const api = axios.create({
  
    baseURL:"http://10.109.71.20:8080/api/version1/",
    headers:headers
})



export default api