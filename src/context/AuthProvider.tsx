import { useToast } from '@chakra-ui/react';
import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

interface AuthContextType {
    session: any;
    authLoading: boolean;
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
    const [authLoading, setAuthLoading] = React.useState(false);
    const toast = useToast()
    const { push, query }  = useRouter()

    const handleRouter = () => {
        push('/auth/login')
    }
    
    const callbackUrl: any = query?.callbackUrl || '/'

    const register = async (data: any) => {

        try {
            setAuthLoading(true);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({
                    position: 'top',
                    title: 'Registered successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(() => handleRouter(), 2000)
            } else {
                toast({
                    position: 'top',
                    title: 'Failed to register',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log('Error occurred while posting data:', error);
        } finally {
            setAuthLoading(false);

        }
    }

    const login = async (data: any) => {

        try {
            setAuthLoading(true);
            const response: any = await signIn('credentials', { 
                ...data, 
                redirect: false,
                callbackUrl 
            })
    
        if(!response.error) {
            push(callbackUrl)
        } else {
            toast({
                position: 'top',
                title: "Failed to login",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    
        } catch (error: any) {
        
            toast({
                position: 'top',
                title: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } finally {
            setAuthLoading(false);
        }
    }

    const value: AuthContextType = {
        session,
        setSession,
        register,
        login,
        authLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
