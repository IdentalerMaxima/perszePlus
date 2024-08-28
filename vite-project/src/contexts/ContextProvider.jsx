import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {},
    isAdmin: false,
    selectedMessageId: null,
    setSelectedMessageId: () => {},
    messages: [],
    setMessages: () => {}
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token') || null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchUserData = async () => {
        if (!userToken) {
            setCurrentUser({});
            setIsAdmin(false);
            return; // Exit if not authorized
        }

        try {
            const response = await axiosClient.get('/user/info', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                setCurrentUser(response.data.user);
                const adminStatus = response.data.user.category === 'admin' || response.data.user.category === 'vezetőség';
                setIsAdmin(adminStatus);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);

            if (error.response && error.response.status === 401) {
                setUserToken(null);
                setCurrentUser({});
                setIsAdmin(false);
            }
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchUserData();
        }
    }, [userToken]); // Fetch user data when userToken changes

    const setUserToken = (token, rememberMe = false) => {
        if (token) {
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
        } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        }
        _setUserToken(token);
    };

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            isAdmin,
            selectedMessageId,
            setSelectedMessageId,
            messages,
            setMessages
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
