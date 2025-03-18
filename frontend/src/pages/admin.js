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
    const location = useLocation()

    return (
        <Container
            style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '200px', fontFamily: "Play", width: '400px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', textAlign:'center', display:'flex', justifyContent:'center' }} className="p-3 #FFFAF4">
            <p style={{ fontSize: '24px' }}>Тут пусто пока что...</p>
                </Card><NavBar/>
        </Container>
    );
}
);

export default AdminPage;