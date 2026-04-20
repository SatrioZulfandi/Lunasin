import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBillStore } from '../src/store/useBillStore';
import { CustomInput } from '../src/components/CustomInput';
import { CategoryPicker } from '../src/components/CategoryPicker';
import { formatDate } from '../src/utils/formatters';

export default function AddBillScreen() {
  const router = useRouter();
  const addBill = useBillStore((state) => state.addBill);

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    dueDate: new Date(),
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Nama tagihan wajib diisi';
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = 'Nominal harus berupa angka valid';
    if (!formData.category) newErrors.category = 'Kategori wajib dipilih';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      addBill({
        name: formData.name,
        amount: parseFloat(formData.amount),
        category: formData.category,
        dueDate: formData.dueDate.toISOString().split('T')[0],
      });
      router.back();
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({ ...formData, dueDate: selectedDate });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CustomInput
        label="Nama Tagihan"
        placeholder="Misal: Tagihan Listrik PLN"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        error={errors.name}
      />

      <CustomInput
        label="Nominal (Rp)"
        placeholder="0"
        value={formData.amount}
        onChangeText={(text) => setFormData({ ...formData, amount: text })}
        keyboardType="numeric"
        error={errors.amount}
      />

      <CategoryPicker
        label="Kategori"
        value={formData.category}
        onChange={(cat) => setFormData({ ...formData, category: cat })}
        error={errors.category}
      />

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.label}>Tanggal Jatuh Tempo</Text>
        <TouchableOpacity 
          style={styles.datePickerBtn}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(formData.dueDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Simpan Tagihan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  datePickerBtn: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
