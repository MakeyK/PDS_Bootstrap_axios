import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password, secretKey) => {
    const { data } = await $host.post('mak/rout/registration', { login, password, secretKey });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const logins = async (login, password) => {
    try {
        console.log('api')
        const { data } = await $host.post('mak/rout/login', { login, password })
        localStorage.setItem('token', data.token)
        console.log(data)
        return jwtDecode(data.token)
    } catch (error) {
        alert(error.response.data.message)
        return
<<<<<<< HEAD
    }}
=======

    }
}
>>>>>>> 520c613af8e8e2ea6974a3061d2b9a76a7444c58

export const createTrains = async (number_train, type_train) => {
    const { data } = await $authHost.post('mak/rout/createtrain', { number_train, type_train })
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
        const {data}  = await $host.get('mak/rout/getallpassengers');
        console.log(data);
        return data;
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

<<<<<<< HEAD
    export const deleteIDTrain = async (id_train1) => {
        try {
            console.log('Удаление')
            const { data } = await $authHost.delete(`mak/rout/del/${id_train1}`)
            console.log(data)
            return data
        } catch (error) {
            alert(error.response.data.message)
        }
=======
export const deleteIDTrain = async (id_train1) => {
    try {
        const { data } = await $authHost.delete(`mak/rout/del/${id_train1}`)
        console.log(data)
        return data
    } catch (error) {
        alert(error.response.data.message)
>>>>>>> 520c613af8e8e2ea6974a3061d2b9a76a7444c58
    }
}

export const deleteIDUser = async (id_user) => {
    try {
        const { data } = await $authHost.delete(`mak/rout/delus/${id_user}`)
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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return data;
    } catch (error) {
        console.error("Ошибка при обновлении пассажира:", error);
        alert(error.response?.data?.message || "Произошла ошибка");
    }
}
