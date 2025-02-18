import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { updatePassenger, getAllPassengers } from '../http/userApi';
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";
import ListPassengers from "./ListPassengers";

const UpdatePassenger = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [showList, setShowList] = useState(false);

    const per = () => {
        navigate(ADMIN_ROUTE);
    };


    const getAllPassengers = async () => {
        try {
            const response = await getAllPassengers();
            UserRequest.setUserRequest(response);
        } catch (error) {
            alert(error);
        }
    };
    useEffect(() => {
        getAllPassengers();
    }, []);

    const handleToggleList = () => {
        setShowList(prevShowList => !prevShowList);
    };

    const updatePassenger = async (e) => {
        e.preventDefault();
        try {
            console.log('Какие данные получили', first_name, last_name);
            const response = await updatePassenger(first_name, last_name);
            console.log("После запроса", first_name, last_name, response);
            await getAllPassengers();
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error);
        }
    };
    

    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>

            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Обновить свои данные</p>
                <Form className="d-flex flex-column" onSubmit={updatePassenger}>
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="text"
                        value={first_name}
                        placeholder="Введите новое имя..."
                        size="lg"
                        onChange={e => setFirstName(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите новую фамилию..."
                        size="lg"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}>
                            Обновить
                        </Button>
                    </p>
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
                <ListPassengers user={UserRequest.getUserRequest()} />
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

export default UpdatePassenger;
