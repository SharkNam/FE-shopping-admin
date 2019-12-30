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
export const setAccessToken = (access_token) => {
    if (access_token) {
        api.interceptors.request.use(config => {
            config.params = config.params || {}
            config.params["access_token"] = access_token
            console.log("config co token", config)
            return config
        })
    }
    // else {
    //     const myInterceptor = axios.interceptors.request.use(function () {/*...*/ });
    //     api.interceptors.request.eject(myInterceptor);
    //     // console.log("ko co accecc token")
    //     // api.interceptors.request.use(config => {
    //     //     console.log("config co token", config)
    //     //     config.params = config.params || {}
    //     //     config.params["access_token"] = ""
    //     //     return config
    //     // })
    // }
}

export * from "./categories"
export * from "./products"
export * from "./accounts"

export default api;