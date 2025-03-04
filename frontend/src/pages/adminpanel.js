import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { createTrains, deleteIDTrain, deleteIDUser, updateUser } from '../http/userApi'
import { Context } from "../index";
import Modal from 'react-bootstrap/Modal';
import { GETUSER_ROUTE, UPDATEPASSENGER_ROUTE, UPDATE_ROUTE } from "../utils/consts";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const AdminPanel = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { UserRequest } = useContext(Context);
    const [showList, setShowList] = useState(false);
    const [number_train, setNumberTrain] = useState('')
    const [type_train, setTypeTrain] = useState('')
    const [id_user, setIDUser] = useState('')
    const [id_train1, setID_Train1] = useState('')
    const [showModal, setShowModal] = useState(false);

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
    const deluser = async (id_user) => {
        try {
            const response = await deleteIDUser(id_user)
            console.log({ message: `Удален пользователь под ${id_user}`, response })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>

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

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
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
                            onClick={() => setShowModal(true)}>
                            Удалить
                        </Button></p>
                    <Modal style={{ fontFamily: 'Play' }} show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header style={{ backgroundColor: '#C9E956', fontSize: '24px' }} closeButton>
                            <Modal.Title>Подтверждение удаления</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#C9E956', fontSize: '20px' }}>
                            Вы уверены, что хотите удалить эту запись?
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#C9E956' }}>
                            <Button variant="secondary" onClick={() => setShowModal(false)}
                                style={{ fontSize: '18px' }}>
                                Отмена
                            </Button>
                            <Button variant="danger"
                                style={{ fontSize: '18px' }}
                                onClick={() => {
                                    deltrain(id_train1)
                                    setShowModal(false)
                                }}>
                                Да, удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form></Card>


            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Удаление по ID пользователя</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="login"
                        value={id_user}
                        placeholder="Введите ID поезда..."
                        size="lg"
                        onChange={e => setIDUser(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '180px', height: '70px' }}
                            onClick={() => setShowModal(true)}>
                            Удалить
                        </Button></p>
                    <Modal style={{ fontFamily: 'Play' }} show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header style={{ backgroundColor: '#C9E956', fontSize: '24px' }} closeButton>
                            <Modal.Title>Подтверждение удаления</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#C9E956', fontSize: '20px' }}>
                            Вы уверены, что хотите удалить эту запись?
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#C9E956' }}>
                            <Button variant="secondary" onClick={() => setShowModal(false)}
                                style={{ fontSize: '18px' }}>
                                Отмена
                            </Button>
                            <Button variant="danger"
                                style={{ fontSize: '18px' }}
                                onClick={() => {
                                    deluser(id_user)
                                    setShowModal(false)
                                }}>
                                Да, удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form></Card>
        </Container>
    );
});

export default AdminPanel;
