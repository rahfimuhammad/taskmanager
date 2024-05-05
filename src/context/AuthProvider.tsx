import React, { createContext, useContext } from 'react';

interface AuthContextType {
    session: any;
    setSession: React.Dispatch<React.SetStateAction<any>>;
    register: (data: any) => void
    login: (data: any) => void
    children?: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};

const AuthProvider: React.FC<AuthContextType> = ({ children }) => {

    const [session, setSession] =  React.useState([]);

    const register = async (data: any) => {

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('Data has been successfully posted');
            } else {
                alert('Failed to post data');
            }
        } catch (error) {
            console.log('Error occurred while posting data:', error);
        }
    }

    const login = async (data: any) => {
        
    }

    const value: AuthContextType = {
        session,
        setSession,
        register,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
