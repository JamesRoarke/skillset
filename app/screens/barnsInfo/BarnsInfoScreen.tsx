import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface StaffMember {
    name: string;
    role: string;
    status: 'On-site' | 'Off-duty';
}

interface StableInfoSubViewProps {
    onBack: () => void;
    staffDetails: StaffMember[];
}

export default function BarnsInfo({ onBack, staffDetails }: StableInfoSubViewProps) {
    const router = useRouter();
    const staffsDetails = [
        { name: 'Sarah Miller', role: 'Head Barn Manager', phone: '+1 (561) 555-0123', status: 'On-site' },
        { name: 'Jake Thompson', role: 'Assistant Trainer', phone: '+1 (561) 555-0456', status: 'Training' },
        { name: 'Emily Chen', role: 'Head Groom', phone: '+1 (561) 555-0789', status: 'Barn A' },
        { name: 'Michael Ross', role: 'Facilities Lead', phone: '+1 (561) 555-0999', status: 'Maintenance' },
        { name: 'Anna Belova', role: 'Stable Hand', phone: '+1 (561) 555-1122', status: 'Off-duty' },
    ];
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/screens/profile/ProfileScreen")} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ROSEWOOD INTERNATIONAL</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {/* Facility Registry Card */}
                    <View style={styles.registryCard}>
                        <View style={styles.registryGlow} />
                        <Text style={styles.registryTitle}>Facility Registry</Text>
                        <Text style={styles.registryLicense}>LICENSE #FL-992-RW</Text>

                        <View style={styles.statsGrid}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Total Horses</Text>
                                <Text style={styles.statValue}>42</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Stall Capacity</Text>
                                <Text style={styles.statValue}>50</Text>
                            </View>
                        </View>
                    </View>

                    {/* Staff Roster Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{'ACTIVE STAFF ROSTER'}</Text>
                        <View style={styles.staffList}>
                            {staffsDetails.map((staff, idx) => (
                                <View key={idx} style={styles.staffCard}>
                                    <View style={styles.staffLeft}>
                                        <View style={styles.staffAvatar}>
                                            <Text style={styles.staffAvatarText}>
                                                {staff.name[0]}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.staffName}>{staff.name}</Text>
                                            <Text style={styles.staffRole}>{staff.role}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.staffRight}>
                                        <View style={[
                                            styles.statusBadge,
                                            staff.status === 'On-site' ? styles.statusOnsite : styles.statusOffDuty
                                        ]}>
                                            <Text style={[
                                                styles.statusText,
                                                staff.status === 'On-site' ? styles.statusTextOnsite : styles.statusTextOffDuty
                                            ]}>
                                                {staff.status.toUpperCase()}
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={styles.phoneButton}>
                                            <Ionicons name="call" size={14} color="#3b82f6" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Location Section */}
                    <View style={styles.locationCard}>
                        <View style={styles.locationHeader}>
                            <View style={styles.locationIcon}>
                                <Ionicons name="navigate" size={20} color="#3b82f6" />
                            </View>
                            <View>
                                <Text style={styles.locationAddress}>12400 Pierson Rd.</Text>
                                <Text style={styles.locationCity}>Wellington, FL 33414</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.directionsButton}>
                            <Text style={styles.directionsButtonText}>GET DIRECTIONS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 24,
        paddingTop: 48,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
    },
    headerTitle: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#0f172a',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    content: {
        padding: 24,
        gap: 24,
    },
    registryCard: {
        backgroundColor: '#0f172a',
        borderRadius: 40,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    registryGlow: {
        position: 'absolute',
        right: -40,
        top: -40,
        width: 160,
        height: 160,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: 80,
    },
    registryTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    registryLicense: {
        fontSize: 10,
        fontWeight: '900',
        color: '#93c5fd',
        letterSpacing: 1.5,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 32,
    },
    statBox: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1.5,
        paddingHorizontal: 4,
    },
    staffList: {
        gap: 12,
    },
    staffCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    staffLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    staffAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    staffAvatarText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    staffName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    staffRole: {
        fontSize: 10,
        fontWeight: '500',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
    staffRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusOnsite: {
        backgroundColor: '#ecfdf5',
    },
    statusOffDuty: {
        backgroundColor: '#f8fafc',
    },
    statusText: {
        fontSize: 8,
        fontWeight: '900',
    },
    statusTextOnsite: {
        color: '#059669',
    },
    statusTextOffDuty: {
        color: '#94a3b8',
    },
    phoneButton: {
        padding: 8,
        backgroundColor: '#eff6ff',
        borderRadius: 8,
    },
    locationCard: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        gap: 16,
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    locationIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationAddress: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    locationCity: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
    },
    directionsButton: {
        paddingVertical: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
    },
    directionsButtonText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748b',
        letterSpacing: 1.5,
    },
});