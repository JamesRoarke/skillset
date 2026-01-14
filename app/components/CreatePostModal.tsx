import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type CategoryKey = 'horses' | 'tack' | 'services' | 'jobs';

interface CreatePostModalProps {
    onClose: () => void;
    activeCategory: CategoryKey;
    setActiveCategory: (category: CategoryKey) => void;
    marketplaceData: Record<CategoryKey, {
        name: string;
        subcategories: string[];
        listings: any[];
    }>;
}

export default function CreatePostModal({
    onClose,
    activeCategory,
    setActiveCategory,
    marketplaceData
}: CreatePostModalProps) {
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'featured' | 'urgent'>('free');

    const plans = [
        {
            id: 'free' as const,
            name: 'Standard',
            price: '$0',
            desc: 'Active for 30 days. Regular placement.',
            icon: 'checkmark-circle-outline',
            color: null
        },
        {
            id: 'featured' as const,
            name: 'Featured',
            price: '$29',
            desc: 'Top of category results. Gold badge.',
            icon: 'trophy-outline',
            iconColor: '#f59e0b',
            color: '#fffbeb'
        },
        {
            id: 'urgent' as const,
            name: 'Urgent',
            price: '$49',
            desc: 'Home dash placement + Daily push alerts.',
            icon: 'flash-outline',
            iconColor: '#3b82f6',
            color: '#eff6ff'
        }
    ];

    const selectedPlanData = plans.find(p => p.id === selectedPlan);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={20} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {step === 1 ? 'NEW MARKETPLACE LISTING' : 'SPONSORSHIP & REACH'}
                </Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {step === 1 ? (
                    // Step 1: Listing Details
                    <View style={styles.content}>
                        {/* Media Upload */}
                        <TouchableOpacity style={styles.mediaUpload}>
                            <Ionicons name="camera-outline" size={32} color="#94a3b8" />
                            <Text style={styles.mediaUploadText}>UPLOAD MEDIA (UP TO 10)</Text>
                        </TouchableOpacity>

                        <View style={styles.formSection}>
                            {/* Category Selection */}
                            <View style={styles.categoryGrid}>
                                {Object.keys(marketplaceData).map(k => (
                                    <TouchableOpacity
                                        key={k}
                                        onPress={() => setActiveCategory(k as CategoryKey)}
                                        style={[
                                            styles.categoryButton,
                                            activeCategory === k && styles.categoryButtonActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.categoryButtonText,
                                            activeCategory === k && styles.categoryButtonTextActive
                                        ]}>
                                            {k.toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Title Input */}
                            <TextInput
                                placeholder="Listing Title"
                                placeholderTextColor="#94a3b8"
                                style={styles.input}
                            />

                            {/* Price and Location Grid */}
                            <View style={styles.inputGrid}>
                                <TextInput
                                    placeholder="Price (e.g. $10,000)"
                                    placeholderTextColor="#94a3b8"
                                    style={[styles.input, styles.inputHalf]}
                                />
                                <TextInput
                                    placeholder="Location"
                                    placeholderTextColor="#94a3b8"
                                    style={[styles.input, styles.inputHalf]}
                                />
                            </View>

                            {/* Description */}
                            <TextInput
                                placeholder="Full Description & Details..."
                                placeholderTextColor="#94a3b8"
                                multiline
                                numberOfLines={4}
                                style={[styles.input, styles.textArea]}
                            />
                        </View>
                    </View>
                ) : (
                    // Step 2: Sponsorship
                    <View style={styles.content}>
                        {/* Info Card */}
                        <View style={styles.infoCard}>
                            <Text style={styles.infoCardLabel}>REACH ASSESSMENT</Text>
                            <Text style={styles.infoCardTitle}>Boost your listing visibility</Text>
                            <Text style={styles.infoCardText}>
                                Sponsored posts receive 5x more inquiries and are shown to out-of-state buyers.
                            </Text>
                        </View>

                        {/* Plan Selection */}
                        <View style={styles.plansContainer}>
                            {plans.map(plan => (
                                <TouchableOpacity
                                    key={plan.id}
                                    onPress={() => setSelectedPlan(plan.id)}
                                    style={[
                                        styles.planCard,
                                        selectedPlan === plan.id && styles.planCardActive,
                                        selectedPlan === plan.id && plan.color && { backgroundColor: plan.color },
                                        selectedPlan !== plan.id && styles.planCardInactive
                                    ]}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.planIcon}>
                                        <Ionicons
                                            name={plan.icon as any}
                                            size={20}
                                            color={plan.iconColor || '#64748b'}
                                        />
                                    </View>
                                    <View style={styles.planContent}>
                                        <View style={styles.planHeader}>
                                            <Text style={styles.planName}>{plan.name}</Text>
                                            <Text style={styles.planPrice}>{plan.price}</Text>
                                        </View>
                                        <Text style={styles.planDesc}>{plan.desc}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Payment Info */}
                        {selectedPlan !== 'free' && (
                            <View style={styles.paymentCard}>
                                <Ionicons name="card-outline" size={20} color="#3b82f6" />
                                <Text style={styles.paymentText}>SAVED CARD: •••• 4242</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Footer Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {
                        if (step === 1) setStep(2);
                        else onClose();
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueButtonText}>
                        {step === 1
                            ? 'CONTINUE TO SPONSORSHIP'
                            : (selectedPlan === 'free'
                                ? 'PUBLISH LISTING'
                                : `PAY & PUBLISH ${selectedPlanData?.price}`
                            )
                        }
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingTop: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    closeButton: {
        padding: 8,
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
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
        paddingBottom: 100,
    },
    content: {
        padding: 24,
        gap: 24,
    },
    mediaUpload: {
        aspectRatio: 16 / 9,
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#cbd5e1',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    mediaUploadText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 0.5,
    },
    formSection: {
        gap: 16,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    categoryButton: {
        flex: 1,
        minWidth: '45%',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    categoryButtonActive: {
        backgroundColor: '#0f172a',
        borderColor: '#0f172a',
    },
    categoryButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    categoryButtonTextActive: {
        color: 'white',
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#0f172a',
    },
    inputGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    inputHalf: {
        flex: 1,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    infoCard: {
        backgroundColor: '#0f172a',
        padding: 24,
        borderRadius: 24,
    },
    infoCardLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#93c5fd',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    infoCardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        marginBottom: 16,
    },
    infoCardText: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 20,
    },
    plansContainer: {
        gap: 12,
    },
    planCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#f1f5f9',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    planCardActive: {
        borderColor: '#0f172a',
        backgroundColor: '#f8fafc',
    },
    planCardInactive: {
        opacity: 0.6,
    },
    planIcon: {
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    planContent: {
        flex: 1,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    planName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    planPrice: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0f172a',
    },
    planDesc: {
        fontSize: 11,
        color: '#64748b',
        lineHeight: 16,
    },
    paymentCard: {
        backgroundColor: '#eff6ff',
        borderWidth: 1,
        borderColor: '#dbeafe',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    paymentText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#1e40af',
        letterSpacing: 1.5,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        backgroundColor: 'white',
        marginBottom: 90,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        backgroundColor: '#3b82f6',
        borderRadius: 16,
    },
    continueButtonText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 1.5,
    },
});