import { Navigate, createBrowserRouter } from "react-router-dom"
import GuestLayout from './components/GuestLayout.jsx'
import DefaultLayout from './components/DefaultLayout.jsx'

import Dashboard from './views/Dashboard.jsx'
import Calendar from './views/Calendar.jsx'
import Courses from './views/Courses.jsx'
import News from './views/News.jsx'
import MyData from './views/MyData.jsx'
import Attendance from './views/Attendance.jsx'

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
                path: '/mydata',
                element: <MyData />
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
