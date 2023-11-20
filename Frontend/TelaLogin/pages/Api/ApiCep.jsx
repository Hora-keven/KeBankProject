import axios from "axios"




const headers = {
  
    'Content-Type': 'application/json',
    'Accept':'application/json',
  
  };


 const apiCep = axios.create({
  
    baseURL:"https://viacep.com.br/ws/",
    headers:headers
})



export default apiCep