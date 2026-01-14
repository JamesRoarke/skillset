import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";
import { View } from "react-native";
import GlassBottomNav from "./components/Navigation/GlassBottomNav";

function RootLayoutNav() {
  const { isAuthenticated, loading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    console.log("Layout auth check:", { isAuthenticated, loading, segments });

    const inAuthGroup = segments[0] === "login" || segments[0] === "signup";

    if (!isAuthenticated && !inAuthGroup) {
      // Not authenticated and not on login/signup -> go to login
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Authenticated and on login/signup -> go to home
      console.log("Redirecting to home");
      router.replace("/home");
    } else if (isAuthenticated && !segments[0]) {
      // Authenticated but no route (shouldn't happen, but just in case)
      router.replace("/home");
    }
  }, [isAuthenticated, loading, segments]);

  // Show navigation only on authenticated screens (not login/signup)
  const showNav = isAuthenticated && segments[0] !== "login" && segments[0] !== "signup";

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="barns" />
        <Stack.Screen name="horselist" />
        <Stack.Screen name="horses/[id]" />
        <Stack.Screen name="marketplace" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="add-post" />
      </Stack>

      {/* Global Bottom Navigation */}
      {showNav && <GlassBottomNav />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}