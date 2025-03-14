import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { ADMIN_ROUTE, ADMINPANEL_ROUTE, GETPASSENGER_ROUTE, GETUSER_ROUTE, POSTPASSNGER_ROUTE, UPDATE_ROUTE, UPDATEPASSENGER_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
    const navigate = useNavigate();

    const admin = () => {
        navigate(ADMIN_ROUTE);
    };
    const getuser = () => {
        navigate(GETUSER_ROUTE);
    };
    const getpassenger = () => {
        navigate(UPDATEPASSENGER_ROUTE);
    };
    const postpas = () => {
        navigate(POSTPASSNGER_ROUTE);
    };
    const update = () => {
        navigate(UPDATE_ROUTE);
    };
    const adminpanel = () => {
        navigate(ADMINPANEL_ROUTE);
    };
    
    return (
        <Navbar style={{ height: '150px', backgroundColor: '#b866ff' }} fixed='top'>
            <Container>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={admin}>
                    Админ страница
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={getuser}>
                    Вывод пользователей
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={getpassenger}>
                    Вывод пассажиров
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={postpas}>
                    Добавить личные данные
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={update}>
                    Обновить данные аккаунта
                </Button>
                <Button
                    size={"lg"}
                    variant={"warning"}
                    style={{ fontWeight: 'bold', borderRadius: 37, width: '150px', height: '80px', fontSize: '15px' }}
                    onClick={adminpanel}>
                    Админ панель
                </Button>
            </Container>
        </Navbar>
    );
});

export default NavBar;