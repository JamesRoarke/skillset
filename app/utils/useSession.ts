import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// Platform-specific proxy URL
const API_URL = Platform.select({
    web: "http://localhost:3000/kratos",
    android: "http://10.0.2.2:3000/kratos",  // Special emulator IP
    default: "http://192.168.1.67:3000/kratos"  // For iOS or real Android devices
});


// Storage abstraction
const storage = {
    setItem: async (key: string, value: string) => {
        if (Platform.OS === "web") {
            sessionStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },
    getItem: async (key: string): Promise<string | null> => {
        if (Platform.OS === "web") {
            return sessionStorage.getItem(key);
        }
        return await SecureStore.getItemAsync(key);
    },
    deleteItem: async (key: string) => {
        if (Platform.OS === "web") {
            sessionStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    },
};

interface Identity {
    id: string;
    traits: {
        email: string;
        name: string;
        role: string;
    };
}

interface Session {
    id: string;
    active: boolean;
    identity: Identity;
    expires_at: string;
}

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkSession = async () => {
        try {
            const token = await storage.getItem("ory_session_token");

            if (!token) {
                setSession(null);
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_URL}/sessions/whoami`, {
                headers: {
                    "X-Session-Token": token,
                    "Accept": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                setSession(data);
            } else {
                // Token invalid or expired
                await storage.deleteItem("ory_session_token");
                setSession(null);
            }
        } catch (err) {
            console.error("Session check error:", err);
            setError("Failed to verify session");
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const token = await storage.getItem("ory_session_token");

            if (token) {
                // Invalidate session on server
                await fetch(`${API_URL}/self-service/logout/api`, {
                    method: "DELETE",
                    headers: {
                        "X-Session-Token": token,
                        "Accept": "application/json",
                    },
                }).catch(() => { }); // Ignore errors
            }
        } finally {
            await storage.deleteItem("ory_session_token");
            setSession(null);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return {
        session,
        loading,
        error,
        isAuthenticated: !!session?.active,
        user: session?.identity?.traits,
        logout,
        refresh: checkSession,
    };
}

export { storage, API_URL };