import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getAllUsers as fetchAllUsers, logins } from '../http/userApi'; // Изменено имя функции для избежания конфликта
import { Context } from "../index";
import ListUser from "./listUsers";
import { ADMIN_ROUTE, UPDATE_ROUTE } from "../utils/consts";

const GetUsers = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);
    const navigate = useNavigate();
    const { user } = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showList, setShowList] = useState(false);

    const getAllUsers = async () => {
        try {
            const response = await fetchAllUsers();
            UserRequest.setUserRequest(response);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const per = async () => {
        navigate(ADMIN_ROUTE)
    }

    const handleToggleList = () => {
        setShowList(prevShowList => !prevShowList);
    };

    const logirov = async (login2, password2) => {
        try {
            const response = await logins(login2, password2)
            console.log('Пользователь авторизовался', response)
            user.setIsAuth(true)
            user.setUser()
        } catch (error) {
            console.error("Ошибка при авторизации:", error)
        }
    }
    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Авторизация</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="login"
                        value={login}
                        placeholder="Введите логин..."
                        size="lg"
                        onChange={e => setLogin(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите пароль..."
                        type="password"
                        size="lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={() => logirov(login, password)}>
                            Войти
                        </Button></p>
                </Form>
            </Card>


            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Вывод всех пользователей</p>
                <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                        onClick={handleToggleList}
                    >
                        {showList ? "Скрыть пользователей" : "Вывести всех пользователей"}
                    </Button>
                </p>
            </Card>
            {showList && UserRequest.getUserRequest() && UserRequest.getUserRequest().length > 0 ? (
                <ListUser user={UserRequest.getUserRequest()} />
            ) : (
                showList && <div>Недостаточно прав или нет пользователей!</div>
            )}

            <Button
                size={"lg"}
                variant={"success"}
                style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px', marginTop: "50px", marginLeft: '120px' }}
                onClick={per}> Вернуться обратно
            </Button>
        </Container>
    );
});

export default GetUsers;
