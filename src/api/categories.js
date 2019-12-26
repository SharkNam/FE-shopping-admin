import api from "./index"
import _ from "lodash"

export const getCategories = () => {
    return api.get("/categories")
        .then(res => _.get(res, "data", []))
        .catch(console.log)
}

export const deleteCategoryById = (id) => {
    return api.delete(`/categories/${id}`)
        .then(console.log)
        .catch(console.log)
}

export const createCategory = (data) => {
    return api.post(`/categories`, data)
        .then(console.log)
        .catch(err => console.log(err.state))
}

export const updateCategoryById = (id) => {
    return api.put(`/categories/${id}`)
        .then(console.log)
        .catch(console.log)
}
