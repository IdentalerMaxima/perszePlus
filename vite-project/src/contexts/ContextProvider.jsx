import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => { },
    userToken: null,
    setUserToken: () => { },
    userIsAdmin: () => { }
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');

    const fetchUserData = async () => {
        try {
          const response = await axiosClient.get('/user/info');
          setCurrentUser(response.data.user);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);

    //   useEffect(() => {
    //     console.log('User token:', userToken);
    //     console.log('Current user:', currentUser);
    //     console.log('Is user admin?', userIsAdmin());
    // }, [userToken, currentUser]);

    const setUserToken = (token) => { 
        if(token){
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        _setUserToken(token);
    }

    const userIsAdmin = () => {
        return currentUser.category === 'vezetőség' || currentUser.category === 'admin';
    }


    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            userIsAdmin
        }}>
            { children }
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);
