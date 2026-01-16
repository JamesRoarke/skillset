// components/Navigation/GlassBottomNav.tsx
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

type NavItem = {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    path: string;
};

const navItems: NavItem[] = [
    { name: 'Home', icon: 'apps-outline', path: '/screens/home/HomeScreen' },
    { name: 'Barn', icon: 'home-outline', path: '/screens/barns/BarnsScreen' },
    { name: 'Add Post', icon: 'add-circle-outline', path: '/screens/add-post/AddPostScreen' },
    { name: 'Market Place', icon: 'bag-handle-outline', path: '/screens/marketplace/MarketplaceScreen' },
    { name: 'Profile', icon: 'person-outline', path: '/screens/profile/ProfileScreen' },
];

export default function GlassBottomNav() {
    const pathname = usePathname();
    const router = useRouter();

    // iOS version with BlurView
    if (Platform.OS === 'ios') {
        return (
            <View style={styles.container}>
                <BlurView intensity={80} tint="light" style={styles.blurContainer}>
                    <View style={styles.navContent}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <TouchableOpacity
                                    key={item.name}
                                    onPress={() => router.push(item.path as any)}
                                    style={styles.navItem}
                                    activeOpacity={0.6}
                                >
                                    <View style={[
                                        styles.iconContainer,
                                        isActive && styles.activeIconContainer
                                    ]}>
                                        <Ionicons
                                            name={item.icon}
                                            size={26}
                                            color={isActive ? '#007AFF' : '#8E8E93'}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </BlurView>
            </View>
        );
    }

    // Android version without BlurView
    return (
        <View style={styles.container}>
            <View style={[styles.blurContainer, styles.androidContainer]}>
                <View style={styles.navContent}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => router.push(item.path as any)}
                                style={styles.navItem}
                                activeOpacity={0.6}
                            >
                                <View style={[
                                    styles.iconContainer,
                                    isActive && styles.activeIconContainer
                                ]}>
                                    <Ionicons
                                        name={item.icon}
                                        size={26}
                                        color={isActive ? '#007AFF' : '#8E8E93'}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    blurContainer: {
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    androidContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIconContainer: {
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
    },
});