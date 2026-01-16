import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { View, Text, Button, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HorseList() {
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

    const [view, setView] = useState('auth');
    const [activeTab, setActiveTab] = useState('home');
    const [selectedListing, setSelectedListing] = useState(null);
    const [expandedHorseId, setExpandedHorseId] = useState<number | null>(null);

    const horseProfiles = [
        {
            id: 1,
            name: 'Apollo',
            breed: 'Dutch Warmblood',
            age: 12,
            owner: 'Sarah Miller',
            status: 'In Training',
            category: 'Show Jumper',
            gender: 'Gelding',
            height: '16.2 hh',
            lastVet: 'Dec 12, 2025',
            performance: 'Level 7',
            colorCode: 'bg-slate-800' // Representing a Dark Bay
        },
        {
            id: 2,
            name: 'Starlight',
            breed: 'Hanoverian',
            age: 8,
            owner: 'James Chen',
            status: 'Resting',
            category: 'Dressage',
            gender: 'Mare',
            height: '16.0 hh',
            lastVet: 'Jan 05, 2026',
            performance: 'Grand Prix',
            colorCode: 'bg-slate-200' // Representing a Grey
        },
        {
            id: 3,
            name: 'Midnight',
            breed: 'Thoroughbred',
            age: 10,
            owner: 'Emma Wilson',
            status: 'In Training',
            category: 'Eventing',
            gender: 'Gelding',
            height: '16.3 hh',
            lastVet: 'Nov 20, 2025',
            performance: 'CCI3*',
            colorCode: 'bg-orange-950' // Representing a Black/Dark Brown
        },
        {
            id: 4,
            name: 'Bella',
            breed: 'Quarter Horse',
            age: 7,
            owner: 'Sarah Miller',
            status: 'Competition',
            category: 'Western',
            gender: 'Mare',
            height: '15.1 hh',
            lastVet: 'Jan 02, 2026',
            performance: 'Regional Champ',
            colorCode: 'bg-orange-800' // Representing a Chestnut
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search Registry..."
                            placeholderTextColor="#94a3b8"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Horse List */}
                    <View style={styles.horseList}>
                        {horseProfiles.map(horse => {
                            const isExpanded = expandedHorseId === horse.id;
                            return (
                                <TouchableOpacity
                                    key={horse.id}
                                    onPress={() => setExpandedHorseId(isExpanded ? null : horse.id)}
                                    activeOpacity={0.9}
                                    style={[
                                        styles.horseCard,
                                        isExpanded && styles.horseCardExpanded
                                    ]}
                                >
                                    {/* Horse Header */}
                                    <View style={styles.horseHeader}>
                                        {/* Profile Image */}
                                        <View style={[styles.horseImage, { backgroundColor: horse.colorCode }]}>
                                            <View style={styles.horseImageGradient} />
                                            <Ionicons name="pulse" size={24} color="rgba(255, 255, 255, 0.4)" />
                                        </View>

                                        <View style={styles.horseInfo}>
                                            <View style={styles.horseNameRow}>
                                                <Text style={styles.horseName} numberOfLines={1}>{horse.name}</Text>
                                                <View style={[
                                                    styles.statusBadge,
                                                    horse.status === 'In Training' && styles.statusTraining,
                                                    horse.status === 'Competition' && styles.statusCompetition,
                                                    horse.status === 'Resting' && styles.statusResting,
                                                ]}>
                                                    <Text style={[
                                                        styles.statusText,
                                                        horse.status === 'In Training' && styles.statusTextTraining,
                                                        horse.status === 'Competition' && styles.statusTextCompetition,
                                                        horse.status === 'Resting' && styles.statusTextResting,
                                                    ]}>
                                                        {horse.status.toUpperCase()}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text style={styles.horseDetails}>{horse.breed} • {horse.age}y</Text>
                                        </View>

                                        <Ionicons
                                            name="chevron-down"
                                            size={16}
                                            color={isExpanded ? '#3b82f6' : '#cbd5e1'}
                                            style={[
                                                styles.chevron,
                                                isExpanded && styles.chevronExpanded
                                            ]}
                                        />
                                    </View>

                                    {/* Expanded Information */}
                                    {isExpanded && (
                                        <View style={styles.expandedContent}>
                                            {/* Info Grid */}
                                            <View style={styles.infoGrid}>
                                                <View style={styles.infoCard}>
                                                    <Text style={styles.infoLabel}>OWNER</Text>
                                                    <Text style={styles.infoValue}>{horse.owner}</Text>
                                                </View>
                                                <View style={styles.infoCard}>
                                                    <Text style={styles.infoLabel}>DISCIPLINE</Text>
                                                    <Text style={styles.infoValue}>{horse.category}</Text>
                                                </View>
                                                <View style={styles.infoCard}>
                                                    <Text style={styles.infoLabel}>BIOMETRICS</Text>
                                                    <Text style={styles.infoValue}>{horse.height} • {horse.gender}</Text>
                                                </View>
                                                <View style={styles.infoCard}>
                                                    <Text style={styles.infoLabel}>PERFORMANCE</Text>
                                                    <Text style={[styles.infoValue, { color: '#3b82f6' }]}>{horse.performance}</Text>
                                                </View>
                                            </View>

                                            {/* Medical Section */}
                                            <View style={styles.medicalSection}>
                                                <Text style={styles.medicalTitle}>MEDICAL & COMPLIANCE</Text>
                                                <View style={styles.medicalRow}>
                                                    <View style={styles.medicalLeft}>
                                                        <Ionicons name="time-outline" size={14} color="#64748b" />
                                                        <Text style={styles.medicalLabel}>Last Veterinary Review</Text>
                                                    </View>
                                                    <Text style={styles.medicalValue}>{horse.lastVet}</Text>
                                                </View>
                                            </View>

                                            {/* Action Buttons */}
                                            <View style={styles.actionButtons}>
                                                <TouchableOpacity style={styles.historyButton} activeOpacity={0.7}>
                                                    <Ionicons name="time-outline" size={14} color="#64748b" />
                                                    <Text style={styles.historyButtonText}>TRACK HISTORY</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.reportButton}
                                                    activeOpacity={0.7}
                                                    onPress={() => router.push(`/screens/horses/HorseDetailScreen?id=${horse.id}`)}
                                                >
                                                    <Ionicons name="document-text-outline" size={14} color="white" />
                                                    <Text style={styles.reportButtonText}>FULL REPORT</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#0f172a',
    },
    addButton: {
        padding: 8,
        backgroundColor: '#0f172a',
        borderRadius: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    content: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        top: 14,
        zIndex: 1,
    },
    searchInput: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingVertical: 14,
        paddingLeft: 44,
        paddingRight: 16,
        fontSize: 14,
    },
    horseList: {
        gap: 16,
    },
    horseCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    horseCardExpanded: {
        borderColor: '#bfdbfe',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    horseHeader: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    horseImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    horseImageGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    horseInfo: {
        flex: 1,
        minWidth: 0,
    },
    horseNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
    },
    horseName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
    },
    statusTraining: {
        backgroundColor: '#eff6ff',
        borderColor: '#dbeafe',
    },
    statusCompetition: {
        backgroundColor: '#fffbeb',
        borderColor: '#fef3c7',
    },
    statusResting: {
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
    },
    statusText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    statusTextTraining: {
        color: '#1e40af',
    },
    statusTextCompetition: {
        color: '#b45309',
    },
    statusTextResting: {
        color: '#475569',
    },
    horseDetails: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '500',
    },
    chevron: {
        transform: [{ rotate: '0deg' }],
    },
    chevronExpanded: {
        transform: [{ rotate: '180deg' }],
    },
    expandedContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 8,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    infoCard: {
        width: '48%',
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    infoLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    medicalSection: {
        marginBottom: 24,
    },
    medicalTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingBottom: 8,
        marginBottom: 16,
    },
    medicalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    medicalLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    medicalLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    medicalValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    historyButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
    },
    historyButtonText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    reportButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        backgroundColor: '#0f172a',
        borderRadius: 12,
    },
    reportButtonText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
});

