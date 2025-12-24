import {createContext, useContext, useState, useEffect} from "react";


export const AuthContext = createContext()



export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setLoggedIn(!!token);
    }, []);


    const login = (token) => {
     localStorage.setItem("authToken", token); // dj-rest-auth returns { "key": "..." }
        setLoggedIn(true);
    }


    const logout = () => {
        localStorage.removeItem("authToken");
        setLoggedIn(false);
    }


    return (
        <AuthContext.Provider value={{ loggedIn , setLoggedIn ,login, logout,}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);
}