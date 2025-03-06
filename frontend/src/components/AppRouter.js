import React, { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { REGISTRATION_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    let isAuth = user.getisAuth(); 

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={Component} exact />
            )}
            <Route path="*" element={<Navigate replace to={REGISTRATION_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;