import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// Create a context for login state
export const LoginContext = createContext({
    loginToLinkedIn: false,
    logout: () => {},
    initalLinkedInLogoutState: true,
    setInitalLinkedInLogoutState: () => {},
});

// Create a provider component
export const LoginProvider = ({ children }) => {
    const [loginToLinkedIn, setLoginToLinkedIn] = useState(false);
    const [initalLinkedInLogoutState, setInitalLinkedInLogoutState] = useState(true);

    useEffect(() => {
        const login = async () => {
            try {
                if (!loginToLinkedIn && initalLinkedInLogoutState) {
                    const response = await axios.get(
                        "http://localhost:3021/api/"
                    );
                    if (response.status == 200) {
                        setLoginToLinkedIn(true);
                    }
                }
            } catch (error) {
                console.error("Login Error:", error);
            }
        };

        login();
    }, [loginToLinkedIn, initalLinkedInLogoutState]);

    
    return (
        <LoginContext.Provider value={{ setLoginToLinkedIn, loginToLinkedIn, setInitalLinkedInLogoutState }}>
            {children}
        </LoginContext.Provider>
    );
};
