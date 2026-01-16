import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';

interface Task {
    id: number;
    task: string;
    time: string;
    status: 'completed' | 'pending';
    details: string;
    assigned: string;
    priority: string;
}

interface StaffMember {
    name: string;
}

const staffDetails: StaffMember[] = [
    { name: 'Jessica W.' },
    { name: 'Mike R.' },
    { name: 'Sarah M.' },
    { name: 'Tom K.' },
];

export default function Barns() {
    const router = useRouter();
    const { taskId } = useLocalSearchParams();
    const [expandedTaskId, setExpandedTaskId] = useState(
        taskId ? Number(taskId) : null
    );
    const [showStaffDropdown, setShowStaffDropdown] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTask, setNewTask] = useState({
        task: '',
        assignedTo: staffDetails[0].name,
        time: '08:00 AM',
        details: '',
        priority: 'Normal'
    });

    // State for task completion
    const [tasks, setTasks] = useState<Task[]>([
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

    const handleAddTask = () => {
        if (!newTask.task.trim()) return;

        const taskToAdd: Task = {
            id: Date.now(),
            task: newTask.task,
            assigned: newTask.assignedTo,
            time: newTask.time,
            status: 'pending',
            details: newTask.details,
            priority: newTask.priority,
        };

        setTasks([taskToAdd, ...tasks]);
        setIsAddingTask(false);
        setNewTask({
            task: '',
            assignedTo: staffDetails[0].name,
            time: '08:00 AM',
            details: '',
            priority: 'Normal'
        });
    };

    const toggleTaskStatus = (id: number, e?: any) => {
        e?.stopPropagation?.();
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    const toggleExpand = (id: number) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.push("/screens/home/HomeScreen")}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>BARN MANAGEMENT</Text>
                <TouchableOpacity
                    onPress={() => setIsAddingTask(true)}
                    style={styles.addButton}
                    activeOpacity={0.9}
                >
                    <Ionicons name="add" size={16} color="white" />
                </TouchableOpacity>
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
                        <View style={styles.sectionTitleContainer}>
                            <Ionicons name="people" size={16} color="#94a3b8" />
                            <Text style={styles.sectionTitle}>TODAY'S TASKS</Text>
                        </View>
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
                                                            task.priority === 'Medium' && styles.priorityMedium,
                                                            task.priority === 'Normal' && styles.priorityNormal,
                                                        ]}>
                                                            <Text style={[
                                                                styles.priorityText,
                                                                task.priority === 'Urgent' && styles.priorityTextUrgent,
                                                                task.priority === 'High' && styles.priorityTextHigh,
                                                                task.priority === 'Medium' && styles.priorityTextMedium,
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

            {/* Add Task Modal */}
            <Modal
                visible={isAddingTask}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddingTask(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>CREATE FACILITY TASK</Text>
                            <TouchableOpacity onPress={() => setIsAddingTask(false)}>
                                <Ionicons name="close" size={24} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalForm}>
                            {/* Task Name */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>TASK NAME</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Task Name (e.g. Clean Stall 4)"
                                    value={newTask.task}
                                    onChangeText={(text) => setNewTask({ ...newTask, task: text })}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>

                            {/* Details */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>DETAILS (OPTIONAL)</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Add notes or instructions..."
                                    value={newTask.details}
                                    onChangeText={(text) => setNewTask({ ...newTask, details: text })}
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>

                            {/* Assignee and Time Row */}
                            <View style={styles.formRow}>
                                <View style={[styles.formGroup, styles.formGroupHalf]}>
                                    <Text style={styles.formLabel}>ASSIGNEE</Text>
                                    <View style={styles.dropdownWrapper}>
                                        <TouchableOpacity
                                            style={styles.dropdownButton}
                                            onPress={() => setShowStaffDropdown(!showStaffDropdown)}
                                        >
                                            <Text style={styles.dropdownButtonText}>{newTask.assignedTo}</Text>
                                            <Ionicons
                                                name={showStaffDropdown ? "chevron-up" : "chevron-down"}
                                                size={16}
                                                color="#64748b"
                                            />
                                        </TouchableOpacity>

                                        {showStaffDropdown && (
                                            <View style={styles.dropdownList}>
                                                {staffDetails.map((staff) => (
                                                    <TouchableOpacity
                                                        key={staff.name}
                                                        style={[
                                                            styles.dropdownItem,
                                                            newTask.assignedTo === staff.name && styles.dropdownItemSelected
                                                        ]}
                                                        onPress={() => {
                                                            setNewTask({ ...newTask, assignedTo: staff.name });
                                                            setShowStaffDropdown(false);
                                                        }}
                                                    >
                                                        <View style={styles.dropdownItemAvatar}>
                                                            <Text style={styles.dropdownItemInitial}>
                                                                {staff.name.split(' ')[0][0]}
                                                            </Text>
                                                        </View>
                                                        <Text style={[
                                                            styles.dropdownItemText,
                                                            newTask.assignedTo === staff.name && styles.dropdownItemTextSelected
                                                        ]}>
                                                            {staff.name}
                                                        </Text>
                                                        {newTask.assignedTo === staff.name && (
                                                            <Ionicons name="checkmark" size={16} color="#4f46e5" />
                                                        )}
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>

                                <View style={[styles.formGroup, styles.formGroupHalf]}>
                                    <Text style={styles.formLabel}>TIME</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={newTask.time}
                                        onChangeText={(text) => setNewTask({ ...newTask, time: text })}
                                        placeholder="08:00 AM"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </View>
                            </View>

                            {/* Priority */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>PRIORITY</Text>
                                <View style={styles.priorityOptions}>
                                    {['Normal', 'Medium', 'High', 'Urgent'].map((priority) => (
                                        <TouchableOpacity
                                            key={priority}
                                            onPress={() => setNewTask({ ...newTask, priority })}
                                            style={[
                                                styles.priorityOption,
                                                newTask.priority === priority && styles.priorityOptionSelected,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.priorityOptionText,
                                                    newTask.priority === priority && styles.priorityOptionTextSelected,
                                                ]}
                                            >
                                                {priority}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleAddTask}
                                style={styles.submitButton}
                                activeOpacity={0.9}
                            >
                                <Text style={styles.submitButtonText}>COMMIT TASK</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        marginTop: 40,
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
        flex: 1,
        textAlign: 'center',
    },
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: '#2563eb',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
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
        borderColor: '#e2e8f0',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
        borderColor: '#e2e8f0',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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
    priorityMedium: {
        backgroundColor: '#fef9c3',
        borderColor: '#fde68a',
    },
    priorityNormal: {
        backgroundColor: '#f1f5f9',
        borderColor: '#e2e8f0',
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '900',
    },
    priorityTextUrgent: {
        color: '#dc2626',
    },
    priorityTextHigh: {
        color: '#ea580c',
    },
    priorityTextMedium: {
        color: '#ca8a04',
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
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
        borderWidth: 1,
        borderColor: '#dbeafe',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    modalTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: 2,
    },
    modalForm: {
        padding: 24,
    },
    formGroup: {
        marginBottom: 20,
    },
    formGroupHalf: {
        flex: 1,
    },
    formLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#0f172a',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    formRow: {
        flexDirection: 'row',
        gap: 12,
    },
    dropdownWrapper: {
        position: 'relative',
        zIndex: 1000,
    },
    dropdownButton: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    dropdownButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    dropdownList: {
        position: 'absolute',
        top: 52,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        maxHeight: 200,
        zIndex: 1001,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    dropdownItemSelected: {
        backgroundColor: '#f8fafc',
    },
    dropdownItemAvatar: {
        width: 28,
        height: 28,
        backgroundColor: '#e0e7ff',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownItemInitial: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4338ca',
    },
    dropdownItemText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
    },
    dropdownItemTextSelected: {
        color: '#0f172a',
        fontWeight: '700',
    },
    pickerText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f172a',
    },
    priorityOptions: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    priorityOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: '#f8fafc',
    },
    priorityOptionSelected: {
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
    },
    priorityOptionText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    priorityOptionTextSelected: {
        color: 'white',
    },
    submitButton: {
        backgroundColor: '#0f172a',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 2,
    },
});