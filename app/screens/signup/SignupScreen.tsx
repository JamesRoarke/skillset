import { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

export default function Signup() {
    const router = useRouter();
    const { register, loading, error, clearError, isAuthenticated } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        clearError();
        const success = await register(email, name, password);
        if (success) {
            // If auto-login happened, go to home; otherwise go to login
            if (isAuthenticated) {
                router.replace("/screens/home/HomeScreen");
            } else {
                router.push("/screens/login/LoginScreen");
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                backgroundColor: "#f3f4f6",
                paddingTop: 80,
                paddingBottom: 40,
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24, color: "#2563eb" }}>
                Create Account
            </Text>

            <TextInput
                style={inputStyle}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                editable={!loading}
            />

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

            <View style={{ width: "80%", marginBottom: 16 }}>
                {loading ? (
                    <ActivityIndicator size="small" color="#2563eb" />
                ) : (
                    <Button title="Sign Up" onPress={handleSignup} />
                )}
            </View>

            <Text
                style={{ marginTop: 20, color: "#2563eb" }}
                onPress={() => !loading && router.push("/screens/login/LoginScreen")}
            >
                Already have an account? Log in
            </Text>
        </ScrollView>
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