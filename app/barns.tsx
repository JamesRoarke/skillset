import { useState } from "react";
import GlassBottomNav from "./components/Navigation/GlassBottomNav";
import { useAuthContext } from "./contexts/AuthContext";
import { View, Text, Button, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Barns() {
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
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    // State for task completion
    const [tasks, setTasks] = useState([
        {
            id: 101,
            task: 'Morning Feed',
            time: '07:00 AM',
            status: 'completed',
            details: 'Check supplement levels for Apollo. Ensure high-fiber mix for Starlight.',
            assigned: 'Jessica W.',
            priority: 'High'
        },
        {
            id: 102,
            task: 'Lungeing - Apollo',
            time: '10:00 AM',
            status: 'pending',
            details: '20 minutes light lungeing. Focus on transitions. Check left front hoof after.',
            assigned: 'Mike R.',
            priority: 'Medium'
        },
        {
            id: 103,
            task: 'Vet Checkup',
            time: '02:30 PM',
            status: 'pending',
            details: 'Dr. Smith visiting for routine vaccinations and coggins testing.',
            assigned: 'Sarah M.',
            priority: 'Urgent'
        }
    ]);

    const toggleTaskStatus = (id: any, e: any) => {
        e.stopPropagation && e.stopPropagation(); // Prevent collapsing when clicking checkbox
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    const toggleExpand = (id: any) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => setView('main-dashboard')}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>BARN MANAGEMENT</Text>
                <View style={styles.avatar}>
                    <Text style={styles.avatarEmoji}>👩‍🌾</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {/* Barn Profile Card */}
                    <View style={styles.barnCard}>
                        <View style={styles.barnGlow} />
                        <Text style={styles.barnTitle}>Rosewood Stables</Text>
                        <View style={styles.badgeContainer}>
                            <View style={[styles.badge, styles.badgeIndigo]}>
                                <Text style={styles.badgeTextIndigo}>24 HORSES</Text>
                            </View>
                            <View style={[styles.badge, styles.badgeEmerald]}>
                                <Text style={styles.badgeTextEmerald}>12 STAFF ACTIVE</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section Header */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>TODAY'S TASKS</Text>
                        <TouchableOpacity style={styles.filterButton}>
                            <Ionicons name="filter" size={14} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    {/* Tasks List */}
                    <View style={styles.tasksList}>
                        {tasks.map(task => {
                            const isExpanded = expandedTaskId === task.id;
                            const isCompleted = task.status === 'completed';

                            return (
                                <TouchableOpacity
                                    key={task.id}
                                    onPress={() => toggleExpand(task.id)}
                                    activeOpacity={0.9}
                                    style={[
                                        styles.taskCard,
                                        isExpanded && styles.taskCardExpanded
                                    ]}
                                >
                                    {/* Task Header */}
                                    <View style={styles.taskHeader}>
                                        <TouchableOpacity
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                toggleTaskStatus(task.id, e);
                                            }}
                                            style={[
                                                styles.taskCheckbox,
                                                isCompleted && styles.taskCheckboxCompleted
                                            ]}
                                            activeOpacity={0.8}
                                        >
                                            {isCompleted ? (
                                                <Ionicons name="checkmark-circle" size={24} color="white" />
                                            ) : (
                                                <View style={styles.taskCheckboxEmpty} />
                                            )}
                                        </TouchableOpacity>

                                        <View style={styles.taskInfo}>
                                            <Text style={[
                                                styles.taskTitle,
                                                isCompleted && styles.taskTitleCompleted
                                            ]}>
                                                {task.task}
                                            </Text>
                                            <View style={styles.taskTimeContainer}>
                                                <Ionicons name="time-outline" size={12} color="#94a3b8" />
                                                <Text style={styles.taskTime}>{task.time}</Text>
                                            </View>
                                        </View>

                                        <View style={[
                                            styles.chevronContainer,
                                            isExpanded && styles.chevronRotated
                                        ]}>
                                            <Ionicons name="chevron-down" size={20} color="#cbd5e1" />
                                        </View>
                                    </View>

                                    {/* Collapsible Details */}
                                    {isExpanded && (
                                        <View style={styles.taskDetails}>
                                            <View style={styles.detailsContainer}>
                                                {/* Notes Section */}
                                                <View style={styles.notesSection}>
                                                    <View style={styles.notesTitleContainer}>
                                                        <Ionicons name="information-circle-outline" size={12} color="#4f46e5" />
                                                        <Text style={styles.notesTitle}>NOTES & INSTRUCTIONS</Text>
                                                    </View>
                                                    <Text style={styles.notesText}>
                                                        {task.details}
                                                    </Text>
                                                </View>

                                                {/* Meta Information Grid */}
                                                <View style={styles.metaGrid}>
                                                    <View style={styles.metaItem}>
                                                        <Text style={styles.metaLabel}>ASSIGNED TO</Text>
                                                        <View style={styles.assignedContainer}>
                                                            <View style={styles.assignedAvatar}>
                                                                <Text style={styles.assignedEmoji}>👤</Text>
                                                            </View>
                                                            <Text style={styles.assignedName}>{task.assigned}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.metaItem}>
                                                        <Text style={styles.metaLabel}>PRIORITY</Text>
                                                        <View style={[
                                                            styles.priorityBadge,
                                                            task.priority === 'Urgent' && styles.priorityUrgent,
                                                            task.priority === 'High' && styles.priorityHigh,
                                                            task.priority === 'Normal' && styles.priorityNormal,
                                                        ]}>
                                                            <Text style={[
                                                                styles.priorityText,
                                                                task.priority === 'Urgent' && styles.priorityTextUrgent,
                                                                task.priority === 'High' && styles.priorityTextHigh,
                                                                task.priority === 'Normal' && styles.priorityTextNormal,
                                                            ]}>
                                                                {task.priority.toUpperCase()}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                {/* Action Buttons */}
                                                <View style={styles.actionButtons}>
                                                    <TouchableOpacity
                                                        style={styles.editButton}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Text style={styles.editButtonText}>EDIT TASK</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={(e) => {
                                                            e.stopPropagation();
                                                            toggleTaskStatus(task.id, e);
                                                        }}
                                                        style={[
                                                            styles.completeButton,
                                                            isCompleted && styles.completeButtonInactive
                                                        ]}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Text style={[
                                                            styles.completeButtonText,
                                                            isCompleted && styles.completeButtonTextInactive
                                                        ]}>
                                                            {isCompleted ? 'MARK PENDING' : 'MARK DONE'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
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
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(248, 250, 252, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
        color: '#0f172a',
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 16,
    },
    barnCard: {
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 24,
        borderWidth: 1,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
        borderColor: '#acb0b4ff',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    },
    barnGlow: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 128,
        height: 128,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderRadius: 64,
        marginRight: -64,
        marginTop: -64,
    },
    barnTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: 16,
        zIndex: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        gap: 8,
        zIndex: 10,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    badgeIndigo: {
        backgroundColor: '#eef2ff',
        borderColor: '#e0e7ff',
    },
    badgeTextIndigo: {
        color: '#4338ca',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    badgeEmerald: {
        backgroundColor: '#ecfdf5',
        borderColor: '#d1fae5',
    },
    badgeTextEmerald: {
        color: '#047857',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    filterButton: {
        padding: 6,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    tasksList: {
        gap: 16,
    },
    taskCard: {
        backgroundColor: 'white',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#acb0b4ff',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
    },
    taskCardExpanded: {
        borderColor: '#e0e7ff',
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    taskHeader: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    taskCheckbox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskCheckboxCompleted: {
        backgroundColor: '#10b981',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    taskCheckboxEmpty: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#cbd5e1',
        borderRadius: 10,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0f172a',
    },
    taskTitleCompleted: {
        color: '#94a3b8',
        textDecorationLine: 'line-through',
    },
    taskTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    taskTime: {
        fontSize: 10,
        color: '#64748b',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 1,
    },
    chevronContainer: {
        transform: [{ rotate: '0deg' }],
    },
    chevronRotated: {
        transform: [{ rotate: '180deg' }],
    },
    taskDetails: {
        paddingBottom: 24,
    },
    detailsContainer: {
        marginHorizontal: 16,
        marginTop: 8,
        padding: 20,
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    notesSection: {
        marginBottom: 16,
    },
    notesTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    notesTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4f46e5',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    notesText: {
        fontSize: 12,
        color: '#475569',
        lineHeight: 18,
        fontWeight: '500',
    },
    metaGrid: {
        flexDirection: 'row',
        gap: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(226, 232, 240, 0.5)',
        marginBottom: 16,
    },
    metaItem: {
        flex: 1,
    },
    metaLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    assignedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    assignedAvatar: {
        width: 20,
        height: 20,
        backgroundColor: '#e0e7ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    assignedEmoji: {
        fontSize: 10,
    },
    assignedName: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    priorityUrgent: {
        backgroundColor: '#fef2f2',
        borderColor: '#fecaca',
    },
    priorityHigh: {
        backgroundColor: '#fff7ed',
        borderColor: '#fed7aa',
    },
    priorityNormal: {
        backgroundColor: '#f1f5f9',
        borderColor: '#e2e8f0',
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    priorityTextUrgent: {
        color: '#dc2626',
    },
    priorityTextHigh: {
        color: '#ea580c',
    },
    priorityTextNormal: {
        color: '#64748b',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
        paddingTop: 8,
    },
    editButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748b',
        textTransform: 'uppercase',
    },
    completeButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#4f46e5',
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    completeButtonInactive: {
        backgroundColor: '#f1f5f9',
        shadowOpacity: 0,
        elevation: 0,
    },
    completeButtonText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'white',
        textTransform: 'uppercase',
    },
    completeButtonTextInactive: {
        color: '#64748b',
    },
});
