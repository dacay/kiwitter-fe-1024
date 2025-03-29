import { useContext } from "react";

import { useHistory } from "react-router-dom";

import Button from "./Button";

import { UserContext } from "../contexts/UserContext";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserContext);
    const history = useHistory();

    const handleLogout = () => {

        logout();

        history.push("/");
    }

    const handleLogin = () => {

        history.push("/login");
    }

    const handleSignup = () => {

        history.push("/signup");
    }
 
    let rightContent;

    if (isLoggedIn) {

        rightContent = <div>
            <Button title="Logout" onClick={handleLogout} />
        </div>;

    } else {

        rightContent = <div className="flex flex-row gap-2">
            <Button title="Giriş" onClick={handleLogin} />
            <Button title="Kayıt Ol" onClick={handleSignup} />
        </div>;
    }
    
    return <div className="sticky top-0 bg-white shadow-md">
        <header className="container mx-auto p-6 flex flex-row justify-between">
            <div>
                <h1 className="text-primary font-bold text-lg">Kiwitter</h1>
            </div>
            <div>{rightContent}</div>
        </header>
    </div>;
}