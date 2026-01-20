import authService from "@/services/authService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const checkUser = async () => {
        setLoading(true);
        const response: any = await authService.getUser();
        if (response?.error) setUser(null);
        else setUser(response);
        setLoading(false);
    }

    const register = async (email: string, password: string) => {
        const response: any = await authService.register(email, password);
        if (response.error) return response;
        return login(email, password); // Auto-login after register
    }

    const login = async (email: string, password: string) => {
        const response: any = await authService.login(email, password);
        if (response.error) return response;
        await checkUser();
        return { success: true };
    }

    const logout = async () => {
        await authService.logout();
        setUser(null);
        await checkUser();
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

