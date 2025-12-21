import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const STORAGE_KEYS = {
    SESSION_TOKEN: "ory_session_token",
} as const;

export const storage = {
    async get(key: string): Promise<string | null> {
        if (Platform.OS === "web") {
            return sessionStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
    },

    async set(key: string, value: string): Promise<void> {
        if (Platform.OS === "web") {
            sessionStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },

    async remove(key: string): Promise<void> {
        if (Platform.OS === "web") {
            sessionStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    },
};

export default storage;