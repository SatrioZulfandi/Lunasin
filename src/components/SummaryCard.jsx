import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatIDR } from "../utils/formatters";
import { useBillStore } from "../store/useBillStore";

export const SummaryCard = () => {
  const bills = useBillStore((state) => state.bills);
  
  const activeBills = bills.filter(b => !b.isPaid);
  const totalUnpaid = activeBills.reduce((sum, bill) => sum + bill.amount, 0);
  
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Total Tagihan Belum Lunas</Text>
        <Ionicons name="wallet-outline" size={24} color="#E0E7FF" />
      </View>
      <Text style={styles.amount}>{formatIDR(totalUnpaid)}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Tagihan</Text>
          <Text style={styles.statValue}>{bills.length}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lunas</Text>
          <Text style={styles.statValue}>{bills.length - activeBills.length}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Belum Lunas</Text>
          <Text style={styles.statValue}>{activeBills.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563EB', // Modern Blue
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    color: '#E0E7FF',
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
