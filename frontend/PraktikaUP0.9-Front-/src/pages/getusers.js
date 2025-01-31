import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUsers } from '../http/userApi'
import { Context } from "../index";
import ListUser from "./listUsers";

const GetUsers = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const { user } = useContext(Context)
    const { UserRequest } = useContext(Context)
    const [list, setList] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()


    const getAllUsers = async () => {
        try {
            const response = await getAllUsers()
            return response
        } catch (error) {
            alert(error)
        }
    }
    

    return (
        <Container
            style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '6px', fontFamily: "Play", width: '500px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Вывод всех пользователей</p>
                <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        size={"lg"}
                        variant={"outline-success"}
                        style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                        onClick={() => setList(true)}
                        >
                        Вывести всех пользователей
                    </Button></p>
            </Card>
            {list? <ListUser user={getAllUsers()} /> : null}
        </Container>
    );
}
);

export default GetUsers;