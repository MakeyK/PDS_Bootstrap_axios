import React, { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    let isAuth = user._isAuth;
    console.log(isAuth)
    console.log(user.getUser())
    return (
        <Routes>
            {isAuth ? (
                authRoutes.map(({ path, Component }) => 
                    <Route key={path} path={path} element={Component} exact />
                ) 
            ) : (
                publicRoutes.map(({ path, Component }) => 
                    <Route key={path} path={path} element={Component} exact />
                )
            )}
            <Route path="*" element={isAuth ? <Navigate replace to={REGISTRATION_ROUTE} /> : <Navigate replace to={LOGIN_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;
