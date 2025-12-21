import GlassBottomNav from "./components/Navigation/GlassBottomNav";
import { useAuthContext } from "./contexts/AuthContext";
import { View, Text, Button, ActivityIndicator } from "react-native";

export default function Home() {
    const { isAuthenticated, loading, user, logout } = useAuthContext();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>
                Welcome, {user?.name}!
            </Text>
            <Text style={{ marginBottom: 8 }}>Email: {user?.email}</Text>
            <Text style={{ marginBottom: 24 }}>Role: {user?.role}</Text>
            <Button title="Logout" onPress={logout} />
            <GlassBottomNav />
        </View>
    );
}