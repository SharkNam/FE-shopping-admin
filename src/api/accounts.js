import api, { setAccessToken } from "./index"
import _ from "lodash"

export const loginForm = (credentials, history) => {
    return api.post("accounts/login/", credentials)
        .then(res => {
            const access_token = res.data.id
            setAccessToken(access_token)
            localStorage.setItem("access_token", res.data.id)  //ko can dang nhap nhung lan sau, reload ko mat

            history.push("/manage")
            return res.data
        })
        .catch(err => Promise.reject(_.get(err, "response.data.error")))
}

export const logout = () => {
    return api.post(`/accounts/logout/`)
        .then(res => {
            res.config.params = undefined
            // setAccessToken()
            console.log(res)
            // window.location.reload(true);
        })
        .catch(err => console.log(err))
}