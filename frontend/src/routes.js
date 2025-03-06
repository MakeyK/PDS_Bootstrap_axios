import { Component } from "react"
import Admin from "./pages/admin"
import { ADMIN_ROUTE, GETUSER_ROUTE, LOGIN_ROUTE, POSTPASSNGER_ROUTE, ADMINPANEL_ROUTE, REGISTRATION_ROUTE, UPDATEPASSENGER_ROUTE, UPDATE_ROUTE } from "./utils/consts"
import GetUsers from "./pages/getusers"
import UpdateUser from "./pages/update"
import UpdatePassenger from "./pages/passenger"
import Registration from "./pages/registration"
import PostPassenger from "./pages/postPas"
import Login from './pages/login'
import AdminPanel from "./pages/adminpanel"

export const authRoutes = [
    {
        path: ADMINPANEL_ROUTE,
        Component: <AdminPanel />
    },
    {
        path: POSTPASSNGER_ROUTE,
        Component: <PostPassenger />
    },
    {
        path: GETUSER_ROUTE,
        Component: <GetUsers />
    },
    {
        path: UPDATE_ROUTE,
        Component: <UpdateUser />
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    },
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
    // {
    //     path: UPDATEPASSENGER_ROUTE,
    //     Component: UpdatePassenger
    // },
    // {
    //     path: ADMINPANEL_ROUTE,
    //     Component: AdminPanel
    // },
    // {
    //     path: POSTPASSNGER_ROUTE,
    //     Component: PostPassenger
    // },
    // {
    //     path: GETUSER_ROUTE,
    //     Component: GetUsers
    // },
    // {
    //     path: UPDATE_ROUTE,
    //     Component: UpdateUser
    // }
]