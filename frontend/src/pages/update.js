import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { updateUser, updatePassenger } from '../http/userApi';
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";

const UpdateUser = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const per = () => {
        navigate(ADMIN_ROUTE);
    };

    const UpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(login, password);
        } catch (error) {
            console.error("Ошибка при обновление пользователя:", error);
        }
    };
    
    const UpdatePassenger = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePassenger(first_name, last_name);
            console.log("Ответ от сервера:", response);
        } catch (error) {
            console.error("Ошибка при обновлении пассажира:", error);
        }
    };
    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Обновить логин или пароль</p>
                <Form className="d-flex flex-column" onSubmit={UpdateUser}>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="text"
                        value={login}
                        placeholder="Введите логин..."
                        size="lg"
                        onChange={e => setLogin(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Выберите пароль..."
                        type="password"
                        size="lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}>
                            Отправить
                        </Button>
                    </p>
                </Form>
            </Card>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Обновить личные данные</p>
                <Form className="d-flex flex-column" onSubmit={UpdatePassenger}>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="text"
                        value={first_name}
                        placeholder="Введите новое имя..."
                        size="lg"
                        onChange={(e) => setFirstName(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите новую фамилию..."
                        size="lg"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)} />
                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}>
                            Обновить
                        </Button></p>
                </Form>
            </Card>

            <Button
                size={"lg"}
                variant={"success"}
                style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px', marginTop: "50px", marginLeft: '120px' }}
                onClick={per}> Вернуться обратно
            </Button>
        </Container>
    );
});

export default UpdateUser;
