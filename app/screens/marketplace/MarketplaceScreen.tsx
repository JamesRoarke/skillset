import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type CategoryKey = 'horses' | 'tack' | 'services' | 'jobs';

export default function MarketPlace() {
    const router = useRouter();

    const [activeCategory, setActiveCategory] = useState<CategoryKey>('horses');
    const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
    type Listing = {
        id: number;
        sub: string;
        type: string;
        title: string;
        details: string;
        price: string;
    };
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

    // Color mapping for subcategory pills
    const subcategoryColors: Record<string, { bg: string; border: string; text: string }> = {
        // Horses
        'sale': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
        'lease': { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
        'part board': { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
        'full board': { bg: '#fce7f3', border: '#fbcfe8', text: '#be185d' },

        // Tack
        'saddles': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
        'bridles': { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
        'blankets': { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
        'boots': { bg: '#fce7f3', border: '#fbcfe8', text: '#be185d' },
        'other': { bg: '#f3f4f6', border: '#e5e7eb', text: '#4b5563' },

        // Services
        'training': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
        'farrier': { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
        'vet': { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
        'transport': { bg: '#fce7f3', border: '#fbcfe8', text: '#be185d' },
        'boarding': { bg: '#f5f3ff', border: '#e9d5ff', text: '#7c3aed' },

        // Jobs
        'barn manager': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
        'groom': { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
        'trainer': { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
        'rider': { bg: '#fce7f3', border: '#fbcfe8', text: '#be185d' },
        'intern': { bg: '#f5f3ff', border: '#e9d5ff', text: '#7c3aed' },
    };

    const getSubcategoryColor = (subcategory: string) => {
        const key = subcategory.toLowerCase();
        return subcategoryColors[key] || { bg: '#eef2ff', border: '#c7d2fe', text: '#4f46e5' };
    };

    const marketplaceData: Record<CategoryKey, {
        name: string;
        subcategories: string[];
        listings: {
            id: number;
            sub: string;
            type: string;
            title: string;
            details: string;
            price: string;
        }[];
    }> = {
        horses: {
            name: 'Horses',
            subcategories: ['All', 'Sale', 'Lease', 'Part Board', 'Full Board'],
            listings: [
                {
                    id: 1,
                    sub: 'Sale',
                    type: 'Warmblood',
                    title: 'Dutch Warmblood Mare',
                    details: '8 years old, trained in dressage, excellent temperament',
                    price: '$25,000',
                },
                {
                    id: 2,
                    sub: 'Lease',
                    type: 'Thoroughbred',
                    title: 'TB Gelding Available for Lease',
                    details: '12 years old, experienced jumper, safe for intermediate riders',
                    price: '$800/month',
                },
                {
                    id: 3,
                    sub: 'Part Board',
                    type: 'Quarter Horse',
                    title: 'QH Mare - Part Board',
                    details: '6 years old, great trail horse, 2-3 days per week',
                    price: '$300/month',
                },
                {
                    id: 10,
                    sub: 'Full Board',
                    type: 'Arabian',
                    title: 'Beautiful Arabian - Full Board',
                    details: '5 years old, seeking experienced rider for full-time care',
                    price: '$600/month',
                },
            ]
        },
        tack: {
            name: 'Tack',
            subcategories: ['All', 'Saddles', 'Bridles', 'Blankets', 'Boots', 'Other'],
            listings: [
                {
                    id: 4,
                    sub: 'Saddles',
                    type: 'Dressage',
                    title: 'Prestige Dressage Saddle',
                    details: '17.5", medium tree, excellent condition',
                    price: '$3,500',
                },
                {
                    id: 5,
                    sub: 'Bridles',
                    type: 'English',
                    title: 'Leather Bridle with Reins',
                    details: 'Full size, brown leather, barely used',
                    price: '$150',
                },
                {
                    id: 11,
                    sub: 'Blankets',
                    type: 'Winter',
                    title: 'Heavyweight Turnout Blanket',
                    details: '84", waterproof, like new condition',
                    price: '$200',
                },
            ]
        },
        services: {
            name: 'Services',
            subcategories: ['All', 'Training', 'Farrier', 'Vet', 'Transport', 'Boarding'],
            listings: [
                {
                    id: 6,
                    sub: 'Training',
                    type: 'Dressage',
                    title: 'Professional Dressage Training',
                    details: 'Experienced trainer offering lessons and full training',
                    price: '$75/session',
                },
                {
                    id: 12,
                    sub: 'Farrier',
                    type: 'Shoeing',
                    title: 'Certified Farrier Services',
                    details: 'Regular shoeing and hoof care',
                    price: '$120/visit',
                },
            ]
        },
        jobs: {
            name: 'Jobs',
            subcategories: ['All', 'Barn Manager', 'Groom', 'Trainer', 'Rider', 'Intern'],
            listings: [
                {
                    id: 7,
                    sub: 'Groom',
                    type: 'Full-time',
                    title: 'Experienced Groom Needed',
                    details: 'Looking for reliable groom for 30-horse barn',
                    price: '$18/hour',
                },
                {
                    id: 13,
                    sub: 'Trainer',
                    type: 'Part-time',
                    title: 'Part-time Riding Instructor',
                    details: 'Teach beginner and intermediate lessons',
                    price: '$30/hour',
                },
            ]
        }
    };

    const currentCategory = marketplaceData[activeCategory];

    // Filter listings by subcategory
    const filteredListings = activeSubcategory === 'all'
        ? currentCategory.listings
        : currentCategory.listings.filter(
            listing => listing.sub.toLowerCase() === activeSubcategory.toLowerCase()
        );

    // Handle category change - reset subcategory to 'all'
    const handleCategoryChange = (category: CategoryKey) => {
        setActiveCategory(category);
        setActiveSubcategory('all');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>EquiMarket</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={20} color="#64748b" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search global registry..."
                        placeholderTextColor="#94a3b8"
                        style={styles.searchInput}
                    />
                </View>

                {/* Category Selector */}
                <View style={styles.categoryGrid}>
                    <TouchableOpacity
                        onPress={() => handleCategoryChange('horses')}
                        style={[
                            styles.categoryButton,
                            activeCategory === 'horses' && styles.categoryButtonActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="horse-variant"
                            size={20}
                            color={activeCategory === 'horses' ? '#4f46e5' : '#94a3b8'}
                        />
                        <Text style={[
                            styles.categoryText,
                            activeCategory === 'horses' && styles.categoryTextActive
                        ]}>
                            HORSES
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleCategoryChange('tack')}
                        style={[
                            styles.categoryButton,
                            activeCategory === 'tack' && styles.categoryButtonActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="horseshoe"
                            size={20}
                            color={activeCategory === 'tack' ? '#4f46e5' : '#94a3b8'}
                        />
                        <Text style={[
                            styles.categoryText,
                            activeCategory === 'tack' && styles.categoryTextActive
                        ]}>
                            TACK
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleCategoryChange('services')}
                        style={[
                            styles.categoryButton,
                            activeCategory === 'services' && styles.categoryButtonActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="tools"
                            size={20}
                            color={activeCategory === 'services' ? '#4f46e5' : '#94a3b8'}
                        />
                        <Text style={[
                            styles.categoryText,
                            activeCategory === 'services' && styles.categoryTextActive
                        ]}>
                            SERVICES
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleCategoryChange('jobs')}
                        style={[
                            styles.categoryButton,
                            activeCategory === 'jobs' && styles.categoryButtonActive
                        ]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="briefcase"
                            size={20}
                            color={activeCategory === 'jobs' ? '#4f46e5' : '#94a3b8'}
                        />
                        <Text style={[
                            styles.categoryText,
                            activeCategory === 'jobs' && styles.categoryTextActive
                        ]}>
                            JOBS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {/* Subcategory Pills */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.subcategoryScroll}
                        contentContainerStyle={styles.subcategoryContainer}
                    >
                        {currentCategory.subcategories.map((sub) => (
                            <TouchableOpacity
                                key={sub}
                                onPress={() => setActiveSubcategory(sub.toLowerCase())}
                                style={[
                                    styles.subcategoryPill,
                                    activeSubcategory === sub.toLowerCase() && styles.subcategoryPillActive
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.subcategoryText,
                                    activeSubcategory === sub.toLowerCase() && styles.subcategoryTextActive
                                ]}>
                                    {sub}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Results Header */}
                    <View style={styles.resultsHeader}>
                        <Text style={styles.resultsTitle}>
                            {activeSubcategory === 'all'
                                ? `VERIFIED ${currentCategory.name.toUpperCase()} LISTINGS`
                                : `${activeSubcategory.toUpperCase()} LISTINGS`
                            }
                        </Text>
                        <Text style={styles.resultsCount}>
                            {filteredListings.length} RESULTS
                        </Text>
                    </View>

                    {/* Listings */}
                    <View style={styles.listingsList}>
                        {filteredListings.map(item => {
                            const colors = getSubcategoryColor(item.sub);
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => setSelectedListing(item)}
                                    style={styles.listingCard}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.listingImage}>
                                        <MaterialCommunityIcons
                                            name={activeCategory === 'horses' ? 'horse-variant' :
                                                activeCategory === 'tack' ? 'horseshoe' :
                                                    activeCategory === 'services' ? 'tools' : 'briefcase'}
                                            size={32}
                                            color="rgba(79, 70, 229, 0.3)"
                                        />
                                    </View>

                                    <View style={styles.listingContent}>
                                        <View style={styles.listingTags}>
                                            <View style={[
                                                styles.tagPrimary,
                                                {
                                                    backgroundColor: colors.bg,
                                                    borderColor: colors.border,
                                                }
                                            ]}>
                                                <Text style={[
                                                    styles.tagPrimaryText,
                                                    { color: colors.text }
                                                ]}>
                                                    {item.sub.toUpperCase()}
                                                </Text>
                                            </View>
                                            <Text style={styles.tagSecondary}>{item.type.toUpperCase()}</Text>
                                        </View>
                                        <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.listingDetails} numberOfLines={2}>{item.details}</Text>
                                        <Text style={styles.listingPrice}>{item.price}</Text>
                                    </View>

                                    <Ionicons
                                        name="chevron-forward"
                                        size={16}
                                        color="#cbd5e1"
                                        style={styles.listingChevron}
                                    />
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
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 24,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    filterButton: {
        width: 40,
        height: 40,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        top: 14,
        zIndex: 1,
    },
    searchInput: {
        width: '100%',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingVertical: 14,
        paddingLeft: 44,
        paddingRight: 16,
        fontSize: 14,
    },
    categoryGrid: {
        flexDirection: 'row',
        gap: 8,
    },
    categoryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    categoryButtonActive: {
        backgroundColor: '#eef2ff',
        borderColor: '#c7d2fe',
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: '#94a3b8',
    },
    categoryTextActive: {
        color: '#4f46e5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    content: {
        paddingTop: 16,
    },
    subcategoryScroll: {
        marginBottom: 20,
    },
    subcategoryContainer: {
        paddingHorizontal: 24,
        gap: 8,
    },
    subcategoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'white',
        marginRight: 8,
        marginBottom: 6,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    subcategoryPillActive: {
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
    },
    subcategoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
    },
    subcategoryTextActive: {
        color: 'white',
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    resultsTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1.5,
    },
    resultsCount: {
        fontSize: 10,
        fontWeight: '700',
        color: '#4f46e5',
    },
    listingsList: {
        gap: 16,
        paddingHorizontal: 24,
    },
    listingCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        gap: 16,
        borderWidth: 1,
        borderColor: '#acb0b4ff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    },
    listingImage: {
        width: 64,
        height: 64,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listingContent: {
        flex: 1,
        minWidth: 0,
    },
    listingTags: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    tagPrimary: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
    },
    tagPrimaryText: {
        fontSize: 8,
        fontWeight: '700',
    },
    tagSecondary: {
        fontSize: 8,
        fontWeight: '700',
        color: '#94a3b8',
    },
    listingTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    listingDetails: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '500',
        lineHeight: 16,
        marginBottom: 8,
    },
    listingPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    listingChevron: {
        alignSelf: 'center',
    },
});