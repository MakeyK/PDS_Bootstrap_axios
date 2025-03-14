import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getAllUsers as fetchAllUsers } from '../http/userApi'; // Изменено имя функции для избежания конфликта
import { Context } from "../index";
import ListUser from "../components/listUsers";
import { ADMIN_ROUTE, UPDATE_ROUTE } from "../utils/consts";
import NavBar from "../components/NavBar";

const GetUsers = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);
    const navigate = useNavigate();
    const { user } = useContext(Context)
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
    }, [UserRequest]);

    const per = async () => {
        navigate(ADMIN_ROUTE)
    }

    const handleToggleList = () => {
        setShowList(prevShowList => !prevShowList);
    };

    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '200px', fontFamily: "Play", width: '500px' }}>
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
                showList && <div style={{backgroundColor:"#C9E956", borderRadius: 37, marginTop: '30px', justifyContent:'center', display:'flex', alignItems:'center', fontSize:'24px'}}>Недостаточно прав или нет пользователей!</div>
            )}

            <Button
                size={"lg"}
                variant={"success"}
                style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px', marginTop: "50px", marginLeft: '120px' }}
                onClick={per}> Вернуться обратно
            </Button><NavBar/>
        </Container>
    );
});

export default GetUsers;
