import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL /* ||  "http://localhost:6969" */
const token = localStorage.getItem("token");

const instance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: "Bearer " + token }
})


const signUp = async (data) => {
    try {
        const response = await axios.post(
            baseURL + "/users/signup", data
        )
        return response.data

    } catch (err) {
        throw err.response
    }
}

const login = async (data) => {
    try {
        const response = await axios.post(
            baseURL + "/users/login", data
        )
        return response.data

    } catch (err) {
        throw err.response
    }
}

const getItems = async () => {
    try {
        const response = await instance.get(
            baseURL + `/items/get`
        )
        return response.data

    } catch (err) {
        throw err.response
    }
}

const postItem = async (data) => {
    try {
        const response = await instance.post(
            baseURL + `/items/post`, data
        )
        return response.data

    } catch (err) {
        throw err.response
    }
}

const updateItem = async (id) => {
    try {
        const response = await axios.patch(
            baseURL + `/items/edit/${id}`
        )
        return response.data
    } catch (err) {
        throw err.response
    }
}

const deleteItem = async (id) => {
    try {
        const response = await axios.delete(
            baseURL + `/items/delete/${id}`
        )
        return response.data
    } catch (err) {
        throw err.response
    }
}

export const ApiServices = {
    login, signUp, postItem, getItems, updateItem, deleteItem
}