import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Profile() {
    const router = useRouter();
    const [reviewTab, setReviewTab] = useState<'received' | 'given'>('received');
    const [activeSection, setActiveSection] = useState<'posts' | 'favorites' | 'sponsorships'>('posts');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const myPosts = [
        { id: 1, title: 'Apollo - Dutch Warmblood', price: '$45,000', sub: 'Show Jumpers', status: 'Active', isSponsored: true }
    ];

    const myFavorites = [
        { id: 5, title: 'Antarès Connexion Saddle', price: '$3,800', sub: 'Saddles', isSponsored: false }
    ];

    const reviewsOfMe = [
        { id: 1, user: 'Jake Thompson', rating: 5, comment: 'Incredible attention to detail. Sarah is the best barn manager we\'ve had.', date: '2 days ago' },
        { id: 2, user: 'Emily Chen', rating: 4, comment: 'Very professional. Highly recommended for show prep.', date: '1 week ago' }
    ];

    const reviewsGivenByMe = [
        { id: 1, target: 'Elite Farrier Services', rating: 5, comment: 'Fixed a chronic balance issue in one session. Amazing.', date: '3 weeks ago' }
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.headerTop}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>SM</Text>
                        </View>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="settings-outline" size={20} color="#64748b" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="share-social-outline" size={20} color="#64748b" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.profileInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>Sarah Miller</Text>
                            <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                        </View>
                        <View style={styles.titleRow}>
                            <Ionicons name="trophy-outline" size={16} color="#64748b" />
                            <Text style={styles.title}>Professional Stable Manager</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={14} color="#94a3b8" />
                            <Text style={styles.location}>Wellington, Florida</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>4.9</Text>
                            <Text style={styles.statLabel}>RATING</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>LISTINGS</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>1.2k</Text>
                            <Text style={styles.statLabel}>FOLLOWERS</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Barn Affiliation */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CURRENT STABLES</Text>
                        <TouchableOpacity style={styles.barnCard} onPress={() => router.push("/screens/barnsInfo/BarnsInfoScreen")}>
                            <View style={styles.barnCardLeft}>
                                <View style={styles.barnIcon}>
                                    <Ionicons name="shield-checkmark" size={24} color="white" />
                                </View>
                                <View>
                                    <Text style={styles.barnName}>Rosewood International</Text>
                                    <Text style={styles.barnRole}>PRIMARY MANAGER</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.4)" />
                        </TouchableOpacity>
                    </View>

                    {/* Activity Tabs */}
                    <View style={styles.section}>
                        <View style={styles.tabBar}>
                            <TouchableOpacity
                                onPress={() => setActiveSection('posts')}
                                style={styles.tab}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeSection === 'posts' && styles.tabTextActive
                                ]}>
                                    MY POSTS
                                </Text>
                                {activeSection === 'posts' && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setActiveSection('favorites')}
                                style={styles.tab}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeSection === 'favorites' && styles.tabTextActive
                                ]}>
                                    FAVORITES
                                </Text>
                                {activeSection === 'favorites' && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setActiveSection('sponsorships')}
                                style={styles.tab}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeSection === 'sponsorships' && styles.tabTextActive
                                ]}>
                                    SPONSOR
                                </Text>
                                {activeSection === 'sponsorships' && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tabContent}>
                            {activeSection === 'sponsorships' ? (
                                <View style={styles.sponsorCard}>
                                    <View style={styles.sponsorHeader}>
                                        <View style={styles.sponsorHeaderLeft}>
                                            <MaterialCommunityIcons name="crown" size={20} color="#f59e0b" />
                                            <Text style={styles.sponsorTitle}>FEATURED LISTING</Text>
                                        </View>
                                        <Text style={styles.sponsorStatus}>ACTIVE</Text>
                                    </View>
                                    <View style={styles.sponsorDetails}>
                                        <Text style={styles.sponsorItemTitle}>Apollo - Dutch Warmblood</Text>
                                        <View style={styles.sponsorStats}>
                                            <View>
                                                <Text style={styles.sponsorStatLabel}>VIEWS</Text>
                                                <Text style={styles.sponsorStatValue}>1,240</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.sponsorStatLabel}>INQUIRIES</Text>
                                                <Text style={styles.sponsorStatValue}>42</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.sponsorButton} onPress={() => router.push("/screens/marketplace/sponsorPerformanceStats")}>
                                        <Ionicons name="bar-chart-outline" size={14} color="white" />
                                        <Text style={styles.sponsorButtonText}>PERFORMANCE STATS</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.itemsList}>
                                    {(activeSection === 'posts' ? myPosts : myFavorites).map(item => (
                                        <TouchableOpacity key={item.id} style={styles.itemCard}>
                                            <View style={styles.itemCardLeft}>
                                                <View style={styles.itemIcon}>
                                                    <MaterialCommunityIcons
                                                        name={activeSection === 'posts' ? 'horse-variant' : 'horseshoe'}
                                                        size={24}
                                                        color="#94a3b8"
                                                    />
                                                </View>
                                                <View>
                                                    <View style={styles.itemTitleRow}>
                                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                                        {item.isSponsored && (
                                                            <MaterialCommunityIcons name="crown" size={12} color="#f59e0b" />
                                                        )}
                                                    </View>
                                                    <Text style={styles.itemDetails}>
                                                        {item.price} • {item.sub}
                                                    </Text>
                                                </View>
                                            </View>
                                            {activeSection === 'posts' ? (
                                                <View style={styles.activeBadge}>
                                                    <Text style={styles.activeBadgeText}>ACTIVE</Text>
                                                </View>
                                            ) : (
                                                <Ionicons name="heart" size={16} color="#f43f5e" />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Reviews Section */}
                    <View style={styles.section}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.sectionTitle}>FEEDBACK</Text>
                            <View style={styles.reviewToggle}>
                                <TouchableOpacity
                                    onPress={() => setReviewTab('received')}
                                    style={[
                                        styles.reviewToggleButton,
                                        reviewTab === 'received' && styles.reviewToggleButtonActive
                                    ]}
                                >
                                    <Text style={[
                                        styles.reviewToggleText,
                                        reviewTab === 'received' && styles.reviewToggleTextActive
                                    ]}>
                                        OF YOU
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setReviewTab('given')}
                                    style={[
                                        styles.reviewToggleButton,
                                        reviewTab === 'given' && styles.reviewToggleButtonActive
                                    ]}
                                >
                                    <Text style={[
                                        styles.reviewToggleText,
                                        reviewTab === 'given' && styles.reviewToggleTextActive
                                    ]}>
                                        GIVEN
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.reviewsList}>
                            {(reviewTab === 'received' ? reviewsOfMe : reviewsGivenByMe).map(review => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View style={styles.reviewHeader}>
                                        <View style={styles.reviewUserInfo}>
                                            <View style={styles.reviewAvatar}>
                                                <Text style={styles.reviewAvatarText}>
                                                    {(('user' in review ? review.user : review.target)?.[0])}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.reviewUserName}>
                                                    {'user' in review ? review.user : review.target}
                                                </Text>
                                                <Text style={styles.reviewDate}>{review.date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.reviewStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Ionicons
                                                    key={i}
                                                    name={i < review.rating ? 'star' : 'star-outline'}
                                                    size={12}
                                                    color={i < review.rating ? '#fbbf24' : '#e5e7eb'}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <Text style={styles.reviewComment}>"{review.comment}"</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Settings */}
                    <View style={styles.section}>
                        <View style={styles.settingsCard}>
                            <TouchableOpacity style={styles.settingRow}>
                                <View style={styles.settingLeft}>
                                    <View style={[styles.settingIcon, { backgroundColor: '#eff6ff' }]}>
                                        <Ionicons name="notifications-outline" size={16} color="#3b82f6" />
                                    </View>
                                    <View>
                                        <Text style={styles.settingTitle}>Push Notifications</Text>
                                        <Text style={styles.settingSubtitle}>Messages, tasks, & updates</Text>
                                    </View>
                                </View>
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                    trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                                    thumbColor={notificationsEnabled ? '#3b82f6' : '#f3f4f6'}
                                />
                            </TouchableOpacity>

                            <View style={styles.settingDivider} />

                            <TouchableOpacity style={styles.settingRow}>
                                <View style={styles.settingLeft}>
                                    <View style={[styles.settingIcon, { backgroundColor: '#fffbeb' }]}>
                                        <Ionicons name="lock-closed-outline" size={16} color="#f59e0b" />
                                    </View>
                                    <View>
                                        <Text style={styles.settingTitle}>Security & Privacy</Text>
                                        <Text style={styles.settingSubtitle}>Two-factor auth active</Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.logoutButton}>
                            <Ionicons name="log-out-outline" size={16} color="#f43f5e" />
                            <Text style={styles.logoutText}>LOG OUT SESSION</Text>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    profileHeader: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingTop: 64,
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    avatar: {
        width: 96,
        height: 96,
        backgroundColor: '#0f172a',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 12,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 16,
    },
    profileInfo: {
        gap: 4,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        fontSize: 12,
        fontWeight: '500',
        color: '#94a3b8',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 32,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94a3b8',
        letterSpacing: 1.5,
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 32,
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 2,
        paddingHorizontal: 4,
    },
    barnCard: {
        backgroundColor: '#0f172a',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    barnCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    barnIcon: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barnName: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    barnRole: {
        fontSize: 10,
        fontWeight: '700',
        color: '#93c5fd',
        letterSpacing: 1.5,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        gap: 24,
    },
    tab: {
        paddingBottom: 12,
        position: 'relative',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1.5,
    },
    tabTextActive: {
        color: '#3b82f6',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#3b82f6',
    },
    tabContent: {
        gap: 12,
    },
    sponsorCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fef3c7',
    },
    sponsorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sponsorHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sponsorTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    sponsorStatus: {
        fontSize: 10,
        fontWeight: '900',
        color: '#d97706',
    },
    sponsorDetails: {
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fffbeb',
        marginBottom: 16,
    },
    sponsorItemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    sponsorStats: {
        flexDirection: 'row',
        gap: 32,
    },
    sponsorStatLabel: {
        fontSize: 8,
        fontWeight: '700',
        color: '#94a3b8',
    },
    sponsorStatValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    sponsorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 10,
        backgroundColor: '#0f172a',
        borderRadius: 12,
    },
    sponsorButtonText: {
        fontSize: 9,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 1.5,
    },
    itemsList: {
        gap: 12,
    },
    itemCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    itemIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    itemDetails: {
        fontSize: 10,
        fontWeight: '700',
        color: '#3b82f6',
        letterSpacing: -0.5,
    },
    activeBadge: {
        backgroundColor: '#ecfdf5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    activeBadgeText: {
        fontSize: 8,
        fontWeight: '900',
        color: '#059669',
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    reviewToggle: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        padding: 4,
        borderRadius: 8,
    },
    reviewToggleButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    reviewToggleButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    reviewToggleText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94a3b8',
    },
    reviewToggleTextActive: {
        color: '#0f172a',
    },
    reviewsList: {
        gap: 16,
    },
    reviewCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        gap: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    reviewUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reviewAvatar: {
        width: 32,
        height: 32,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewAvatarText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748b',
    },
    reviewUserName: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    reviewDate: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
    },
    reviewStars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewComment: {
        fontSize: 12,
        color: '#475569',
        lineHeight: 18,
        fontStyle: 'italic',
    },
    settingsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    settingSubtitle: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
    },
    settingDivider: {
        height: 1,
        backgroundColor: '#f1f5f9',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        backgroundColor: '#fef2f2',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fecaca',
        cursor: 'pointer',
    },
    logoutText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#f43f5e',
        letterSpacing: 1.5,
    },
});