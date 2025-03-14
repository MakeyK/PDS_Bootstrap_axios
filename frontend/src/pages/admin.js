import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { createTrains } from '../http/userApi'
import { Context } from "../index";
import { GETUSER_ROUTE, UPDATEPASSENGER_ROUTE, UPDATE_ROUTE } from "../utils/consts";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import NavBar from "../components/NavBar";

const AdminPage = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const { user } = useContext(Context)
    const { UserRequest } = useContext(Context)
    const navigate = useNavigate()
    const [number_train, setNumberTrain] = useState('')
    const [type_train, setTypeTrain] = useState('')
    const location = useLocation()

    const train = async (number_train, type_train) => {
        try {
            const response2 = await createTrains(number_train, type_train)
            console.log({ message: 'Поезд добавлен', response2 })
            return response2
        } catch (error) {
            alert(error)
        }
    }

    const per = async () => {
        navigate(GETUSER_ROUTE)
    }
    const updatepass = async () => {
        navigate(UPDATEPASSENGER_ROUTE)
    }

    return (
        <Container
            style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '200px', fontFamily: "Play", width: '500px' }}>

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
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

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-3 #FFFAF4">
                <ButtonToolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '300px', height: '70px', marginTop: '20px' }}
                        onClick={per}>
                        Вывод пользователей
                    </Button>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '300px', height: '70px', marginTop: '20px' }}
                        onClick={updatepass}> Вывод пассажиров
                    </Button></ButtonToolbar></Card><NavBar/>
        </Container>
    );
}
);

export default AdminPage;