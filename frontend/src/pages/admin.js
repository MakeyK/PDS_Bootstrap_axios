import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { createTrains, deleteIDTrain, registration, updateUser } from '../http/userApi'
import { Context } from "../index";
import Modal from 'react-bootstrap/Modal';
import { GETUSER_ROUTE } from "../utils/consts";

const AdminPage = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const { user } = useContext(Context)
    const { UserRequest } = useContext(Context)
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [number_train, setNumberTrain] = useState('')
    const [type_train, setTypeTrain] = useState('')
    const [id_train1, setID_Train1] = useState('')
    const [showModal, setShowModal] = useState(false);
    const location = useLocation()
    const [id_user, setIdUser] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const click = async () => {
        try {
            const response = await registration(login, password)
            user.setIsAuth(true)
            user.setUser()
            console.log({ message: 'Зарегался, молодец', response })
        } catch (error) {
            alert(error)
        }
    }

    const train = async (number_train, type_train) => {
        try {
            const response2 = await createTrains(number_train, type_train)
            console.log({ message: 'Поезд добавлен', response2 })
            return response2
        } catch (error) {
            alert(error)
        }
    }

    const deltrain = async (id_train1) => {
        try {
            const response = await deleteIDTrain(id_train1)
            console.log({ message: `Удален поезд под ${id_train1}`, response })
        } catch (error) {
            alert(error)
        }
    }

    const per = async () => {
        navigate(GETUSER_ROUTE)
    }

    const UpdateUser = async (id_user, login, password) => {
        try {
            const response = await updateUser(id_user, login, password)
            console.log(`Пользователь обновлён`, response)
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error)
        }
    };

    return (
        <Container
            style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Регистрация</p>
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
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={click}
                        >
                            Зарегистрироваться
                        </Button></p>
                </Form>
            </Card>



            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Добавление данных о поезде в БД</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="login"
                        value={number_train}
                        placeholder="Введите номер поезда..."
                        size="lg"
                        onChange={e => setNumberTrain(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите тип поезда..."
                        size="lg"
                        value={type_train}
                        onChange={e => setTypeTrain(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '180px', height: '70px' }}
                            onClick={() => train(number_train, type_train)}
                        >
                            Отправить
                        </Button></p>
                </Form></Card>



            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Удаление по ID поезда</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="login"
                        value={id_train1}
                        placeholder="Введите ID поезда..."
                        size="lg"
                        onChange={e => setID_Train1(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '180px', height: '70px' }}
                            onClick={() => setShowModal(true)}
                        >
                            Удалить
                        </Button></p>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение удаления</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Вы уверены, что хотите удалить эту запись?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Отмена
                            </Button>
                            <Button variant="danger"
                                onClick={() => {
                                    deltrain(id_train1)
                                    setShowModal(false)
                                }}>
                                Да, удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form></Card>





            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '300px', height: '100px' }}
                        onClick={per}>
                        Перейти на страницу с выводом пользователей
                    </Button></p></Card>

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px', color:'purple', fontWeight:'bold', textDecoration:'underline' }}>Обновление пользователя по ID</p>
                <Form>
                    <Form.Label style={{ fontSize: '24px' }}>ID пользователя</Form.Label>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        placeholder="Введите ID пользователя..."
                        value={id_user}
                        onChange={(e) => setIdUser(e.target.value)} />
                    <Form.Label style={{ fontSize: '24px' }}>Новый логин</Form.Label>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        placeholder="Введите новый логин..."
                        value={newLogin}
                        onChange={(e) => setNewLogin(e.target.value)} />
                    <Form.Label style={{ fontSize: '24px' }}>Новый пароль</Form.Label>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        type="password"
                        placeholder="Введите новый пароль..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                        onClick={() => UpdateUser(id_user, newLogin, newPassword)}>
                        Обновить пользователя
                    </Button>
                </Form>
            </Card>


        </Container>
    );
}
);

export default AdminPage;