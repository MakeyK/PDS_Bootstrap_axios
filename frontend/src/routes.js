import { Component } from "react"
import Admin from "./pages/admin"
import {ADMIN_ROUTE, GETUSER_ROUTE, UPDATE_ROUTE } from "./utils/consts"
import GetUsers from "./pages/getusers"
import UpdateUser from "./pages/update"

export const authRoutes = [
   
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: GETUSER_ROUTE,
        Component: GetUsers
    },
    {
        path: UPDATE_ROUTE,
        Component: UpdateUser
    }
]