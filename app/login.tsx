import { useState } from "react";
import { View, TextInput, Button, Text, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthContext } from "./contexts/AuthContext";

export default function Login() {
    const router = useRouter();
    const { login, loading, error, clearError } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        clearError();
        await login(email, password);
    };

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#f3f4f6", paddingTop: 80 }}>
            <Image
                source={require("../assets/logo/skillset.png")}
                style={{ width: 250, height: 200, resizeMode: "contain", marginBottom: 24 }}
            />

            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24, color: "#2563eb" }}>
                Login
            </Text>

            <TextInput
                style={inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
            />

            <TextInput
                style={inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            {error && (
                <Text style={{ color: "red", marginBottom: 16, textAlign: "center", paddingHorizontal: 20 }}>
                    {error}
                </Text>
            )}

            <View style={{ width: "80%" }}>
                {loading ? (
                    <ActivityIndicator size="small" color="#2563eb" />
                ) : (
                    <Button title="Login" onPress={handleLogin} />
                )}
            </View>

            <Text
                style={{ marginTop: 20, color: "#2563eb" }}
                onPress={() => router.push("/signup" as any)}
            >
                Don't have an account? Sign up
            </Text>
        </View>
    );
}

const inputStyle = {
    width: "80%" as any,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
};