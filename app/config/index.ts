// config.ts
import { Platform } from "react-native";

// Platform-specific host
const DEV_HOST = Platform.select({
    web: "localhost",
    android: "10.0.2.2",  // Special emulator IP maps to host's localhost
    default: "192.168.1.67"  // For iOS or real Android devices
});

export const config = {
    // API endpoints
    api: {
        baseUrl: `http://${DEV_HOST}:3000`,
        authUrl: `http://${DEV_HOST}:3000/kratos`,
    },

    // App settings
    app: {
        name: "Skillset",
    },
} as const;

export default config;