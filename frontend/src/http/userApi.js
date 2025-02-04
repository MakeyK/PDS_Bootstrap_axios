import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password) => {
    const { data } = await $host.post('mak/rout/createuser', { login, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

// export const logins = async (login, password) => {
//     const { data } = await $host.post('login', { login, password })
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }

export const createTrains = async (number_train, type_train) => {
    const { data } = await $host.post('mak/rout/createtrain', { number_train, type_train })
    return data
}

export const getAllUsers = async () => {
    try {
        const { data } = await $host.get(`mak/rout/getallusers`)
        return data
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const deleteIDTrain = async (id_train1) => {
    try {
        const { data } = await $host.delete(`mak/rout/del/${id_train1}`)
        return data
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const updateUser = async (id_user, login, password) => {
    try {
        const { data } = await $host.patch(`mak/rout/red/${id_user}`, {login, password})
        return data
    } catch (error) {
        alert(error.response.data.message)
    }
}