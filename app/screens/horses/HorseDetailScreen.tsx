import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HorseDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // In a real app, you'd fetch the horse data based on the ID
    // For now, we'll use dummy data

    const horses = [
        {
            id: '1',
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
            id: '2',
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
            id: '3',
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
            id: '4',
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

    const horse = horses.find(h => h.id === id || h.id === String(id));

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{horse ? horse.name : 'Unknown Horse'}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Full Report for {horse ? horse.name : 'Unknown Horse'}</Text>
                {/* Add your horse detail content here */}
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
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    scrollView: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 16,
    },
});