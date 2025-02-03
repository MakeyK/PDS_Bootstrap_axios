import React, { useContext } from "react"; 
import {Routes, Route, Navigate} from 'react-router-dom'  
import { authRoutes, publicRoutes } from "../routes"; 
import {ADMIN_ROUTE, GETUSER_ROUTE} from "../utils/consts"; 
import { Context } from "../index"; 

const AppRouter = () => { 
    const {user} = useContext(Context)
    
    // let isAuth = true 
    let isAuth = user.getisAuth()
    
    return(
         
    <Routes> 
        <Route path="*" element = {<Navigate to={ADMIN_ROUTE} />} replace />  
        {isAuth && publicRoutes.map(({path, Component}) => 
            <Route key = {path} path ={path} element = {<Component/>} exact/> 
    )} 
        {publicRoutes.map(({path, Component}) => 
        <Route key = {path} path ={path} element = {<Component/>} exact/> 
    )} 
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={ADMIN_ROUTE}</Navigate>} replace/>
        
    )} 
    </Route>
    <Route>
        {publicRoutes.map(({path, Component}) =>
        <Route  path="*" element = {<Navigate> to={GETUSER_ROUTE}</Navigate>} replace/>
        
    )} 
    </Route>
    </Routes> 
    ) 
};
export default AppRouter;