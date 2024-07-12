import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => { },
    userToken: null,
    setUserToken: () => { },
    isAdmin: false,
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || null);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUserData = async () => {
        // Check if userToken exists
        if (!userToken) {
            setCurrentUser({});
            setIsAdmin(false);
            return; // Exit if not authorized
        }
    
        try {
            const response = await axiosClient.get('/user/info');
    
            if (response.status === 200) {
                setCurrentUser(response.data.user);
                setIsAdmin(response.data.user.category === 'admin' || response.data.user.category === 'vezetőség');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
    
            // Handle unauthorized access
            if (error.response && error.response.status === 401) {
                setUserToken(null);
                setCurrentUser({});
            }
        }
    };
    

    useEffect(() => {
        fetchUserData();
    }, []);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        _setUserToken(token);
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            isAdmin,
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);
