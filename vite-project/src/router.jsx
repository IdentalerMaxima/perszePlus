import { Navigate, createBrowserRouter } from "react-router-dom"
import GuestLayout from './components/GuestLayout.jsx'
import DefaultLayout from './components/DefaultLayout.jsx'

import Dashboard from './views/Dashboard.jsx'
import Calendar from './views/Calendar.jsx'
import Courses from './views/Courses.jsx'
import News from './views/News.jsx'
import Members from './views/Members.jsx'
import Attendance from './views/Attendance.jsx'

import Settings from './views/user/Settings.jsx'
import Profile from './views/user/Profile.jsx'


import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/news',
                element: <News />,
            },
            {
                path: '/members',
                element: <Members />
            },
            {
                path: '/calendar',
                element: <Calendar />
            },
            {
                path: '/courses',
                element: <Courses />
            },
            {
                path: '/attendance',
                element: <Attendance />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/profile',
                element: <Profile />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ] 
    }
])

export default router;
