import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getAllPassengers } from '../http/userApi';
import { Context } from "../index";
import ListPassengers from "../components/ListPassengers";
import NavBar from "../components/NavBar";

const GetPassengers = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { UserRequest } = useContext(Context);
    const [showList, setShowList] = useState(false);

    const fetchAllPassengers = async () => {
        try {
            const response = await getAllPassengers();
            console.log(response);
            UserRequest.setUserRequest(response);
        } catch (error) {
            alert(error.message);
        }
    };    

    useEffect(() => {
        fetchAllPassengers().then((data)=> UserRequest.setUserRequest(data));
    }, [UserRequest]);

    const handleToggleList = () => {
        setShowList(prevShowList => !prevShowList);
    };

    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '200px', fontFamily: "Play", width: '500px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5">
                <p style={{ fontSize: '24px' }}>Вывод всех пассажиров</p>
                <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                        onClick={handleToggleList}
                    >
                        {showList ? "Скрыть пассажиров" : "Вывести всех пассажиров"}
                    </Button>
                </p>
            </Card>
            {showList && UserRequest.getUserRequest() && UserRequest.getUserRequest().length > 0 ? (
                <ListPassengers user={UserRequest.getUserRequest()} />
            ) : (
                showList && <div style={{ borderRadius: 37, marginTop: '30px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontSize: '24px' }}>Недостаточно прав или нет пассажиров!</div>
            )}

            <NavBar />
        </Container>
    );
});

export default GetPassengers;