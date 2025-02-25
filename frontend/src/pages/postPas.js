import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { createPassengers } from '../http/userApi'
import { Context } from "../index";
import { UPDATE_ROUTE, ADMIN_ROUTE } from "../utils/consts";

const PostPassenger = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const { user } = useContext(Context)
    const { UserRequest } = useContext(Context)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const location = useLocation()
    const [id_user, setIdUser] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    const passengerpost = async (first_name, last_name) => {
        try {
            const response2 = await createPassengers(first_name, last_name)
            console.log({ message: 'Пассажир добавлен', response2 })
            return response2
        } catch (error) {
            alert(error)
        }
    }
    const update = async () => {
        navigate(UPDATE_ROUTE)
    }
    const per = () => {
        navigate(ADMIN_ROUTE);
    };

    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Добавить личные данные</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="text"
                        value={first_name}
                        placeholder="Введите имя..."
                        size="lg"
                        onChange={e => setFirstName(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите фамилию..."
                        size="lg"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={() => passengerpost(first_name, last_name)}>
                            Отправить данные
                        </Button>
                    </p>
                </Form>
            </Card>
            <Button
                size={"lg"}
                variant={"outline-success"}
                style={{ fontWeight: 'bold', borderRadius: 37, width: '300px', height: '70px', marginTop: '30px', marginLeft: '90px' }}
                onClick={update}>
                Обновить данные
            </Button>
            <Button
                size={"lg"}
                variant={"success"}
                style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px', marginTop: "50px", marginLeft: '120px' }}
                onClick={per}> Вернуться обратно
            </Button>
        </Container>
    );
}
);

export default PostPassenger;