import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatIDR, getDaysUntilDue, formatDate } from "../utils/formatters";
import { useBillStore } from "../store/useBillStore";

const getCategoryIconInfo = (category) => {
  switch (category) {
    case "electricity":
      return { name: "flash", color: "#F59E0B", bg: "#FEF3C7" }; // Yellow/Amber
    case "internet":
      return { name: "wifi", color: "#3B82F6", bg: "#DBEAFE" }; // Blue
    case "water":
      return { name: "water", color: "#0EA5E9", bg: "#E0F2FE" }; // Light Blue
    case "gas":
      return { name: "flame", color: "#EF4444", bg: "#FEE2E2" }; // Red
    case "insurance":
      return { name: "shield-checkmark", color: "#10B981", bg: "#D1FAE5" }; // Green
    case "entertainment":
      return { name: "tv", color: "#8B5CF6", bg: "#EDE9FE" }; // Purple
    default:
      return { name: "receipt", color: "#6B7280", bg: "#F3F4F6" }; // Gray
  }
};

export const BillCard = ({ bill }) => {
  const togglePaidStatus = useBillStore((state) => state.togglePaidStatus);
  const iconInfo = getCategoryIconInfo(bill.category);
  const daysUntilDue = getDaysUntilDue(bill.dueDate);
  
  const isOverdue = daysUntilDue < 0 && !bill.isPaid;
  const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3 && !bill.isPaid;

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconInfo.bg }]}>
        <Ionicons name={iconInfo.name} size={24} color={iconInfo.color} />
      </View>
      
      <View style={styles.middleContainer}>
        <Text style={styles.title} numberOfLines={1}>{bill.name}</Text>
        <Text style={styles.date}>{formatDate(bill.dueDate)}</Text>
        
        {!bill.isPaid && (
          <View style={[styles.pill, isOverdue ? styles.pillOverdue : isDueSoon ? styles.pillDueSoon : styles.pillNormal]}>
            <Text style={[styles.pillText, isOverdue ? styles.pillTextOverdue : isDueSoon ? styles.pillTextDueSoon : styles.pillTextNormal]}>
              {isOverdue ? `Terlambat ${Math.abs(daysUntilDue)} Hari` : `${daysUntilDue} hari lagi`}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.amount}>{formatIDR(bill.amount)}</Text>
        <TouchableOpacity 
          style={[styles.badge, bill.isPaid ? styles.badgePaid : styles.badgeUnpaid]}
          onPress={() => togglePaidStatus(bill.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.badgeText, bill.isPaid ? styles.badgeTextPaid : styles.badgeTextUnpaid]}>
            {bill.isPaid ? 'Lunas' : 'Belum Lunas'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pillNormal: { backgroundColor: '#F3F4F6' },
  pillTextNormal: { color: '#4B5563', fontSize: 11, fontWeight: '500' },
  pillDueSoon: { backgroundColor: '#FEF3C7' },
  pillTextDueSoon: { color: '#B45309', fontSize: 11, fontWeight: '500' },
  pillOverdue: { backgroundColor: '#FEE2E2' },
  pillTextOverdue: { color: '#B91C1C', fontSize: 11, fontWeight: '700' },
  
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePaid: {
    backgroundColor: '#D1FAE5',
  },
  badgeUnpaid: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextPaid: {
    color: '#065F46',
  },
  badgeTextUnpaid: {
    color: '#991B1B',
  },
});
