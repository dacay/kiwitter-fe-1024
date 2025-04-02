import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    let userVal = localStorage.getItem("user");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(userVal ? JSON.parse(userVal) : null);

    const isLoggedIn = token !== null;

    const login = ({ token, username, name }) => {

        setToken(token);

        const userObj = {
            username,
            name            
        };

        setUser(userObj);
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userObj));
    };

    const logout = () => {

        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return <UserContext.Provider value={{ isLoggedIn, login, logout, user }}>
        {children}
    </UserContext.Provider>
}