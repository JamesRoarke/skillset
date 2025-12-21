import { useState, useEffect, useCallback } from "react";
import authService, { Session, User } from "../services/auth";

interface UseAuthReturn {
    user: User | null;
    session: Session | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, name: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    clearError: () => void;
}

export function useAuth(): UseAuthReturn {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            const currentSession = await authService.getSession();
            setSession(currentSession);
        } catch (err) {
            console.error("Session refresh error:", err);
            setSession(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        try {
            setError(null);
            setLoading(true);
            const result = await authService.login(email, password);
            setSession(result.session);
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (email: string, name: string, password: string): Promise<boolean> => {
        try {
            setError(null);
            setLoading(true);
            const result = await authService.register(email, name, password);
            if (result.session) {
                setSession(result.session);
            }
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await authService.logout();
            setSession(null);
            // DON'T call refresh() - we already know we're logged out
        } catch (err) {
            console.error("Logout error:", err);
            setSession(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user: session?.identity?.traits || null,
        session,
        loading,
        error,
        isAuthenticated: !!session?.active,
        login,
        register,
        logout,
        refresh,
        clearError,
    };
}

export default useAuth;