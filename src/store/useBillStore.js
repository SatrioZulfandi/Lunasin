import { create } from 'zustand';
import { mockBills, userProfile } from '../data/mockData';

export const useBillStore = create((set) => ({
  bills: mockBills,
  user: userProfile,
  
  addBill: (newBill) => 
    set((state) => ({
      bills: [
        ...state.bills, 
        { ...newBill, id: Date.now().toString(), isPaid: false }
      ]
    })),
    
  updateBill: (id, updatedData) =>
    set((state) => ({
      bills: state.bills.map((bill) => 
        bill.id === id ? { ...bill, ...updatedData } : bill
      )
    })),
    
  togglePaidStatus: (id) =>
    set((state) => ({
      bills: state.bills.map((bill) =>
        bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill
      )
    })),
    
  deleteBill: (id) =>
    set((state) => ({
      bills: state.bills.filter((bill) => bill.id !== id)
    })),
}));
