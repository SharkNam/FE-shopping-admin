import _ from 'lodash';
import api from "./index"
import axios from "axios"

export const getProducts = () => {
    return api.get("/products")
        .then(res => _.get(res, "data", []))
        .catch(console.log)
}

export const createProduct = (data) => {
    return api.post(`/products`, data)
        .then(res => ({
            status: _.get(res, "status"),
            data: res.data
        }))
        .catch(err => ({
            status: _.get(err, "response.status"),
            messages: _.get(err, "response.data.error.details.messages", [])
        }))
}

export const deleteProductById = (id) => {
    return api.delete(`/products/${id}`)
        .then(console.log())
        .catch(console.log)
}

export const updateProductById = (id, data) => {
    return api.put(`/products/${id}`, data)
        .then(console.log)
        .catch(console.log)
}