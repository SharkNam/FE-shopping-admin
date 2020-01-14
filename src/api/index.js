// reject khi tach ra block spoce thi ko hoat dong???
import axios from 'axios'
//tao bang moi luu nhung thang xoa 
//cho 1 bien: bang 1 thi xoa khoi bang
//xoa cung hoac xoa mem
const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

//set accesstoken luu trong params cho nhuwng lan dang nhap sau
//luu accesstoken trong params de co the thuc hien request duoc
//tu dong chen vao param trong tat ca moi request

export const setAccessToken = () => {
    api.interceptors.request.use(config => {
        const access_token = localStorage.getItem("access_token")

        if (!access_token) {
            config.params = config.params || {}
            delete config.params["access_token"]
        }
        else {
            config.params = config.params || {}
            config.params["access_token"] = access_token
        }
        return config;
    })



}

export * from "./categories"
export * from "./products"
export * from "./accounts"

export default api;
