import { useState } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { View, Text, Button, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
    const { isAuthenticated, loading, user, logout } = useAuthContext();
    const [view, setView] = useState('auth');
    const [activeTab, setActiveTab] = useState('home');
    const router = useRouter();
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    const tasks = [
        { id: 101, task: 'Morning Feed', time: '07:00 AM', status: 'completed' },
        { id: 102, task: 'Lungeing', time: '10:00 AM', status: 'pending' },
    ];

    if (!isAuthenticated) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
                        <Text style={styles.userName}>Sarah Miller</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={20} color="#64748b" />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarEmoji}>👩‍🌾</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mainContent}>
                    {/* Quick Stats Grid */}
                    <View style={styles.statsGrid}>
                        <TouchableOpacity style={styles.statCard} onPress={() => router.push("/horselist")}>
                            <View style={[styles.statIconContainer, { backgroundColor: '#eef2ff' }]}>
                                <Ionicons name="trending-up" size={20} color="#4f46e5" />
                            </View>
                            <Text style={styles.statLabel}>ACTIVE HORSES</Text>
                            <Text style={styles.statValue}>24</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.statCard} onPress={() => router.push("/barns")}>
                            <View style={[styles.statIconContainer, { backgroundColor: '#ecfdf5' }]}>
                                <Ionicons name="checkmark-circle" size={20} color="#059669" />
                            </View>
                            <Text style={styles.statLabel}>TASKS DONE</Text>
                            <Text style={styles.statValue}>18/22</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Barn Shortcut */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>BARN MANAGEMENT</Text>
                            <TouchableOpacity onPress={() => router.push("/barns")}>
                                <Text style={styles.sectionLink}>Open Dashboard</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.barnCard} onPress={() => router.push("/barns")}>
                            <View style={styles.barnIcon}>
                                <Text style={styles.barnEmoji}>🏢</Text>
                            </View>
                            <View style={styles.barnContent}>
                                <Text style={styles.barnTitle}>Rosewood Stables</Text>
                                <Text style={styles.barnSubtitle}>4 Urgent Tasks Pending</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    </View>

                    {/* Marketplace Shortcut */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>MARKET DISCOVERY</Text>
                            <TouchableOpacity onPress={() => { setView('marketplace'); setActiveTab('market'); }}>
                                <Text style={[styles.sectionLink, { color: '#059669' }]}>Go Shopping</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.marketplaceCard}
                            onPress={() => { setView('marketplace'); setActiveTab('market'); }}
                            activeOpacity={0.8}
                        >
                            <View style={styles.marketplaceGlow} />
                            <View style={styles.marketplaceHeader}>
                                <View style={styles.marketplaceIcon}>
                                    <Ionicons name="bag-outline" size={20} color="white" />
                                </View>
                                <Text style={styles.marketplaceBrand}>EquiMarket</Text>
                            </View>
                            <Text style={styles.marketplaceTitle}>Explore 150+ New Leases</Text>
                            <Text style={styles.marketplaceSubtitle}>
                                Find trainers, gear, and horses in your local area.
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Calendar/Upcoming */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>UPCOMING TODAY</Text>
                        <View style={styles.tasksList}>
                            {tasks.map(t => (
                                <TouchableOpacity
                                    key={t.id}
                                    style={styles.taskCard}
                                    onPress={() => router.push(`/barns?taskId=${t.id}`)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.taskLeft}>
                                        <View style={[
                                            styles.taskDot,
                                            { backgroundColor: t.status === 'completed' ? '#10b981' : '#fbbf24' }
                                        ]} />
                                        <Text style={styles.taskText}>{t.task}</Text>
                                    </View>
                                    <Text style={styles.taskTime}>{t.time}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* <GlassBottomNav /> */}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcomeLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4f46e5',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0f172a',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    notificationButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        backgroundColor: '#f43f5e',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'white',
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: '#e0e7ff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 18,
    },
    mainContent: {
        paddingHorizontal: 24,
        gap: 32,
        marginTop: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#acb0b4ff',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0f172a',
    },
    section: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1e293b',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    sectionLink: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4f46e5',
    },
    barnCard: {
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 20,
        borderWidth: 1,
        borderColor: '#acb0b4ff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    barnIcon: {
        width: 56,
        height: 56,
        backgroundColor: '#4f46e5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barnEmoji: {
        fontSize: 28,
    },
    barnContent: {
        flex: 1,
    },
    barnTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0f172a',
        lineHeight: 20,
    },
    barnSubtitle: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    marketplaceCard: {
        backgroundColor: '#0f172a',
        borderRadius: 40,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    marketplaceGlow: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderRadius: 80,
    },
    marketplaceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    marketplaceIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#10b981',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marketplaceBrand: {
        color: 'white',
        fontWeight: '900',
        fontSize: 14,
    },
    marketplaceTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white',
        lineHeight: 24,
        marginBottom: 8,
    },
    marketplaceSubtitle: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '500',
        maxWidth: 200,
    },
    tasksList: {
        gap: 12,
    },
    taskCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#acb0b4ff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    taskDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    taskText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
    },
    taskTime: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
});
