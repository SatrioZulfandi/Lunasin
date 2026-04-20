import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'electricity', name: 'Listrik (PLN)', icon: 'flash', color: '#F59E0B' },
  { id: 'internet', name: 'Internet / WiFi', icon: 'wifi', color: '#3B82F6' },
  { id: 'water', name: 'Air (PDAM)', icon: 'water', color: '#0EA5E9' },
  { id: 'gas', name: 'Gas PGN / Token', icon: 'flame', color: '#EF4444' },
  { id: 'insurance', name: 'Asuransi / BPJS', icon: 'shield-checkmark', color: '#10B981' },
  { id: 'entertainment', name: 'Hiburan / Layanan Streaming', icon: 'tv', color: '#8B5CF6' },
  { id: 'other', name: 'Lainnya', icon: 'receipt', color: '#6B7280' },
];

export const CategoryPicker = ({ label, value, onChange, error }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCategory = categories.find(c => c.id === value);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity 
        style={[styles.pickerButton, error && styles.pickerError]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectedContent}>
          {selectedCategory ? (
            <>
              <Ionicons name={selectedCategory.icon} size={20} color={selectedCategory.color} style={styles.icon} />
              <Text style={styles.selectedText}>{selectedCategory.name}</Text>
            </>
          ) : (
            <Text style={styles.placeholder}>Pilih Kategori</Text>
          )}
        </View>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Kategori</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.categoryItem}
                  onPress={() => {
                    onChange(item.id);
                    setModalVisible(false);
                  }}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  {value === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  pickerError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  selectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  selectedText: {
    fontSize: 16,
    color: '#1F2937',
  },
  placeholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  listContainer: {
    paddingBottom: 40,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
});
