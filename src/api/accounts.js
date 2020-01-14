import api, { setAccessToken } from "./index"
import _ from "lodash"

export const loginForm = (credentials, history) => {
    return api.post("/accounts/login/", credentials)
        .then(res => {
            const access_token = res.data.id
            console.log("TCL: loginForm -> access_token", access_token)
            setAccessToken()
            localStorage.setItem("access_token", res.data.id)  //ko can dang nhap nhung lan sau, reload ko mat

            history.push("/manage")
            return res.data
        })
        .catch(err => Promise.reject(_.get(err, "response.data.error")))
}

export const logout = () => {
    return api.post(`/accounts/logout/`)
        .then(console.log())
        .catch(err => console.log(err))
}