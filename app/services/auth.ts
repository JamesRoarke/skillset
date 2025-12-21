import config from "../config";
import storage, { STORAGE_KEYS } from "../utils/storage";
import { Platform } from "react-native";

const AUTH_URL = config.api.authUrl;

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface Session {
    id: string;
    active: boolean;
    identity: { id: string; traits: User };
    expires_at: string;
}

function extractErrors(data: any): string {
    const fieldErrors = data.ui?.nodes
        ?.filter((n: any) => n.messages?.length > 0)
        ?.flatMap((n: any) => n.messages.map((m: any) => m.text));
    const generalErrors = data.ui?.messages?.map((m: any) => m.text);
    const allErrors = [...(fieldErrors || []), ...(generalErrors || [])];
    return allErrors.join(", ") || data.error?.reason || data.error?.message || "An error occurred";
}

function proxyUrl(url: string): string {
    return url.replace(/^https?:\/\/[^/]+/, AUTH_URL);
}

export const authService = {
    async login(identifier: string, password: string) {
        console.log("Starting login for:", identifier);

        // Use browser flow for web, API flow for mobile
        const flowEndpoint = Platform.OS === "web"
            ? `${AUTH_URL}/self-service/login/browser`
            : `${AUTH_URL}/self-service/login/api`;

        console.log("Fetching flow from:", flowEndpoint);
        const flowRes = await fetch(flowEndpoint, {
            headers: { "Accept": "application/json" },
            credentials: "include",
        });

        console.log("Flow response status:", flowRes.status);
        if (!flowRes.ok) throw new Error("Failed to initialize login");

        const flow = await flowRes.json();
        console.log("Flow data:", flow);

        // Extract CSRF token for browser flows
        const csrfToken = flow.ui.nodes.find((n: any) => n.attributes?.name === "csrf_token")?.attributes?.value;
        console.log("CSRF token:", csrfToken ? "found" : "not found");

        const body: any = { method: "password", identifier, password };
        if (csrfToken) {
            body.csrf_token = csrfToken;
        }

        const submitUrl = proxyUrl(flow.ui.action);
        console.log("Submitting to:", submitUrl);
        console.log("Body:", { ...body, password: "***" });

        const loginRes = await fetch(submitUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });

        console.log("Login response status:", loginRes.status);
        const data = await loginRes.json();
        console.log("Login response data:", data);

        if (!loginRes.ok) throw new Error(extractErrors(data));

        if (Platform.OS !== "web" && data.session_token) {
            await storage.set(STORAGE_KEYS.SESSION_TOKEN, data.session_token);
        }
        return { session: data.session, token: data.session_token };
    },

    async register(email: string, name: string, password: string) {
        // Use browser flow for web, API flow for mobile
        const flowEndpoint = Platform.OS === "web"
            ? `${AUTH_URL}/self-service/registration/browser`
            : `${AUTH_URL}/self-service/registration/api`;

        const flowRes = await fetch(flowEndpoint, {
            headers: { "Accept": "application/json" },
            credentials: "include",
        });
        if (!flowRes.ok) throw new Error("Failed to initialize registration");
        const flow = await flowRes.json();

        // Extract CSRF token for browser flows
        const csrfToken = flow.ui.nodes.find((n: any) => n.attributes?.name === "csrf_token")?.attributes?.value;

        const body: any = { method: "password", password, traits: { email, name, role: "user" } };
        if (csrfToken) {
            body.csrf_token = csrfToken;
        }

        const registerRes = await fetch(proxyUrl(flow.ui.action), {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const data = await registerRes.json();
        if (!registerRes.ok) throw new Error(extractErrors(data));

        if (Platform.OS !== "web" && data.session_token) {
            await storage.set(STORAGE_KEYS.SESSION_TOKEN, data.session_token);
            return { session: data.session, token: data.session_token };
        }
        return { session: data.session };
    },

    async getSession(): Promise<Session | null> {
        try {
            if (Platform.OS === "web") {
                const res = await fetch(`${AUTH_URL}/sessions/whoami`, {
                    headers: { "Accept": "application/json" },
                    credentials: "include",
                });
                if (!res.ok) {
                    return null;
                }
                return res.json();
            }

            const token = await storage.get(STORAGE_KEYS.SESSION_TOKEN);
            if (!token) return null;

            const res = await fetch(`${AUTH_URL}/sessions/whoami`, {
                headers: { "X-Session-Token": token, "Accept": "application/json" },
            });
            if (!res.ok) {
                await storage.remove(STORAGE_KEYS.SESSION_TOKEN);
                return null;
            }
            return res.json();
        } catch (error) {
            console.error("Session check error:", error);
            return null;
        }
    },

    async logout(): Promise<void> {
        try {
            if (Platform.OS === "web") {
                // Create logout flow
                const flowRes = await fetch(`${AUTH_URL}/self-service/logout/browser`, {
                    credentials: "include",
                });

                if (flowRes.ok) {
                    const flow = await flowRes.json();
                    console.log("Logout flow:", flow);

                    // Execute the logout using the proxied URL
                    if (flow.logout_url) {
                        const proxiedLogoutUrl = proxyUrl(flow.logout_url);
                        console.log("Proxied logout URL:", proxiedLogoutUrl);

                        await fetch(proxiedLogoutUrl, {
                            method: "GET",
                            credentials: "include",
                        });
                    }
                }
            } else {
                const token = await storage.get(STORAGE_KEYS.SESSION_TOKEN);
                if (token) {
                    await fetch(`${AUTH_URL}/self-service/logout/api`, {
                        method: "DELETE",
                        headers: { "X-Session-Token": token },
                    }).catch(() => { });
                }
                await storage.remove(STORAGE_KEYS.SESSION_TOKEN);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
};

export default authService;