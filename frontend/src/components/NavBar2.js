import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import {  LOGIN_ROUTE, REGISTRATION_ROUTE, } from "../utils/consts";

const NavBar2 = observer(() => {
    const navigate = useNavigate();

    const log = () => {
        navigate(LOGIN_ROUTE);
    };
    const reg = () => {
        navigate(REGISTRATION_ROUTE );
    };
    
    
    return (
        <Navbar style={{ height: '80px', backgroundColor: '#b866ff' }} fixed='top'>
            <Container>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '40px', fontSize: '15px' }}
                    onClick={reg}>
                    Регистрация
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '40px', fontSize: '15px' }}
                    onClick={log}>
                    Авторизация
                </Button>
            </Container>
        </Navbar>
    );
});

export default NavBar2;