import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password) => {
    const { data } = await $host.post('mak/rout/registration', { login, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logins = async (login, password) => {
    const { data } = await $host.post('mak/rout/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const createTrains = async (number_train, type_train) => {
    const { data } = await $host.post('mak/rout/createtrain', { number_train, type_train })
    return data
}

export const createPassengers = async (first_name, last_name) => {
    try {
        const { data } = await $authHost.post('mak/rout/createpassenger', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            data: { first_name: first_name, last_name: last_name }
        })
        return data
    } catch (error) {
        alert(error.response.data.message)
        return
    }
}

export const getAllPassengers = async () => {
    try {
        const { data } = await $host.get(`mak/rout/getallpassengers`)
        return data
    } catch (error) {
        alert(error.response.data.message)
    }
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

export const updateUser = async (login, password) => {
    try {
        if (!login && !password) {
            console.log('Данные:', login, password)
            return;
        }
        const { data } = await $authHost.patch(`/mak/rout/red`, {
            login, password
        });
        return data;
    } catch (error) {
        console.error("Ошибка при обновлении пользователя:", error);
        alert(error.response?.data?.message || "Произошла ошибка");
    }
}

export const updatePassenger = async (first_name, last_name) => {
    try {
        if (!first_name && !last_name) {
            console.log('Данные:', first_name, last_name);
            return;
        }
        const { data } = await $authHost.patch('/mak/rout/redpassenger', {
            data: {
                first_name,
                last_name
            },
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        return data;
    } catch (error) {
        console.error("Ошибка при обновлении пассажира:", error);
        alert(error.response?.data?.message || "Произошла ошибка");
    }
}
