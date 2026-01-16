import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface SponsorStatsSubViewProps {
    setProfileSubView: (view: string) => void;
}

const SponsorStatsSubView: React.FC<SponsorStatsSubViewProps> = ({
    setProfileSubView,
}) => {
    const viewVelocityData = [
        { label: 'Marketplace Search', val: 75, color: '#3b82f6' },
        { label: 'Dashboard Feature', val: 40, color: '#f59e0b' },
        { label: 'External (Direct)', val: 15, color: '#cbd5e1' },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => setProfileSubView('main')}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={20} color="#475569" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>SPONSORSHIP ANALYTICS</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Horse Info */}
                <View style={styles.horseInfo}>
                    <View style={styles.horseIcon}>
                        <MaterialCommunityIcons
                            name="horse-variant"
                            size={20}
                            color={'#4f46e5'}
                        />
                    </View>
                    <View>
                        <Text style={styles.horseName}>Apollo - Dutch Warmblood</Text>
                        <View style={styles.featuredBadge}>
                            <MaterialCommunityIcons name="crown" size={20} color="#d97706" />
                            <Text style={styles.featuredText}>FEATURED CAMPAIGN</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>REACH</Text>
                        <Text style={styles.statValue}>1.2k</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>CLICKS</Text>
                        <Text style={styles.statValue}>342</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>CTR</Text>
                        <Text style={styles.statValue}>28.5%</Text>
                    </View>
                </View>

                {/* View Velocity */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>VIEW VELOCITY</Text>
                        <Text style={styles.sectionSubtitle}>+12% vs Yesterday</Text>
                    </View>
                    <View style={styles.velocityCard}>
                        {viewVelocityData.map((item, i) => (
                            <View key={i} style={styles.velocityItem}>
                                <View style={styles.velocityLabelRow}>
                                    <Text style={styles.velocityLabel}>{item.label}</Text>
                                    <Text style={styles.velocityValue}>{item.val}%</Text>
                                </View>
                                <View style={styles.progressBarContainer}>
                                    <View
                                        style={[
                                            styles.progressBar,
                                            { width: `${item.val}%`, backgroundColor: item.color },
                                        ]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Action Funnel */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ACTION FUNNEL</Text>
                    <View style={styles.funnelCard}>
                        <View style={styles.funnelItem}>
                            <View style={styles.funnelIconContainer}>
                                <MaterialCommunityIcons name="eye" size={20} color="#60a5fa" />
                            </View>
                            <View style={styles.funnelContent}>
                                <Text style={styles.funnelLabel}>Total Impressions</Text>
                                <Text style={styles.funnelValue}>4,502</Text>
                            </View>
                        </View>

                        <View style={styles.funnelItem}>
                            <View style={styles.funnelIconContainer}>
                                <MaterialCommunityIcons name="cursor-pointer" size={20} color="#fbbf24" />
                            </View>
                            <View style={styles.funnelContent}>
                                <Text style={styles.funnelLabel}>Inquiry Buttons Tapped</Text>
                                <Text style={styles.funnelValue}>82</Text>
                            </View>
                        </View>

                        <View style={styles.funnelItem}>
                            <View style={styles.funnelIconContainer}>
                                <MaterialCommunityIcons name="target" size={20} color="#34d399" />
                            </View>
                            <View style={styles.funnelContent}>
                                <Text style={styles.funnelLabel}>Serious Leads Generated</Text>
                                <Text style={styles.funnelValue}>14</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <MaterialCommunityIcons name="information" size={20} color="#fbbf24" style={styles.infoIcon} />
                    <Text style={styles.infoText}>
                        Your campaign is performing{' '}
                        <Text style={styles.infoBold}>3.4x better</Text> than organic
                        listings in the Wellington area.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        paddingBottom: 128,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        backgroundColor: '#ffffff',
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
    content: {
        padding: 24,
        gap: 32,
    },
    horseInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    horseIcon: {
        width: 64,
        height: 64,
        backgroundColor: '#292524',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    horseName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    featuredBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    featuredText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
        color: '#d97706',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94a3b8',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
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
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#94a3b8',
    },
    sectionSubtitle: {
        fontSize: 9,
        fontWeight: '700',
        color: '#059669',
    },
    velocityCard: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        gap: 24,
    },
    velocityItem: {
        gap: 8,
    },
    velocityLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    velocityLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748b',
    },
    velocityValue: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0f172a',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#f8fafc',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 9999,
    },
    funnelCard: {
        backgroundColor: '#0f172a',
        borderRadius: 24,
        padding: 24,
        gap: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    funnelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    funnelIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    funnelContent: {
        flex: 1,
    },
    funnelLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 2,
    },
    funnelValue: {
        fontSize: 20,
        fontWeight: '900',
        color: '#ffffff',
    },
    infoBox: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fffbeb',
        borderWidth: 1,
        borderColor: '#fef3c7',
        borderRadius: 12,
        gap: 12,
        alignItems: 'flex-start',
    },
    infoIcon: {
        flexShrink: 0,
    },
    infoText: {
        flex: 1,
        fontSize: 10,
        color: '#92400e',
        fontWeight: '500',
        lineHeight: 16,
    },
    infoBold: {
        fontWeight: '700',
    },
});

export default SponsorStatsSubView;