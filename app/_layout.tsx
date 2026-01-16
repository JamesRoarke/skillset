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

    const inAuthGroup = String(segments[0]) === "login" || String(segments[0]) === "signup";

    if (!isAuthenticated && !inAuthGroup) {
      // Not authenticated and not on login/signup -> go to login
      router.replace("/screens/login/LoginScreen");
    } else if (isAuthenticated && inAuthGroup) {
      // Authenticated and on login/signup -> go to home
      console.log("Redirecting to home");
      router.replace("/screens/home/HomeScreen");
    } else if (isAuthenticated && !segments[0]) {
      // Authenticated but no route (shouldn't happen, but just in case)
      router.replace("/screens/home/HomeScreen");
    }
  }, [isAuthenticated, loading, segments]);

  // Show navigation only on authenticated screens (not login/signup)
  const showNav = isAuthenticated && String(segments[0]) !== "login" && String(segments[0]) !== "signup";

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens/login/LoginScreen" />
        <Stack.Screen name="screens/signup/SignupScreen" />
        <Stack.Screen name="screens/home/HomeScreen" />
        <Stack.Screen name="screens/barns/Barns" />
        <Stack.Screen name="screens/horselist/HorseList" />
        <Stack.Screen name="screens/horses/[id]" />
        <Stack.Screen name="screens/marketplace/Marketplace" />
        <Stack.Screen name="screens/profile/Profile" />
        <Stack.Screen name="screens/add-post/AddPost" />
        <Stack.Screen name="screens/barnsInfo/BarnsInfo" />
        <Stack.Screen name="screens/sponsorPerformanceStats/SponsorPerformanceStats" />
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