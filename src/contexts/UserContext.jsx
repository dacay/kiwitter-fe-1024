import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [token, setToken] = useState('');

    const isLoggedIn = token !== '';

    const login = (token) => setToken(token);

    const logout = () => setToken('');

    return <UserContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
    </UserContext.Provider>
}