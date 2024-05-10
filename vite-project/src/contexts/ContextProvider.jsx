import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => { },
    userToken: null,
    setUserToken: () => { }
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');

    const fetchUserData = async () => {
        try {
          const response = await axiosClient.get('/user/info');
          setCurrentUser(response.data.user);
          //console.log("u data", response.data.user);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchUserData();
        //console.log("fetch user data");
      }, []);

    const setUserToken = (token) => { 
        if(token){
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
            setUserToken
        }}>
            { children }
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);
