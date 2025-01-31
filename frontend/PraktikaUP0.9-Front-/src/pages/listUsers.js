import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const ListUser = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()


    return (
            
            <ListGroup style={{
            display: "inline-block",
            borderRadius: "10 px",
            color: '#C9E956',
            overflow: 'scroll', height: "300px", marginTop: "10px"
        }}>
            {
                user._user.map((data) => (
                  
                    <ListGroup.Item key={data.id_user} style={{ backgroundColor: '#FFFFFF4D' }}>
                        <Col style={{
                            maxHeight: "120px", width: "100", border: "1px solid black",
                            borderRadius: "10px", marginTop: "10px", overflow: 'scroll'
                        }}>
                            
                            <div style={{ color: "black" }}>ID_Пользователя <div>{data.id_user}</div>
                            </div>
                            <div style={{ color: "black" }}>Логин <div>{data.login}</div>
                            </div>
                        </Col>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
}
);

export default ListUser;