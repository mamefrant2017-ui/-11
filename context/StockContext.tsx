import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, Transaction } from '../types';

interface StockContextType {
  products: Product[];
  categories: Category[];
  transactions: Transaction[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  recordSale: (data: { customer: string; items: { productId: string; quantity: number }[] }) => void;
  recordPurchase: (data: { supplier: string; invoice: string; items: { productId: string; quantity: number; cost: number }[] }) => void;
  stats: {
    totalValue: number;
    lowStockCount: number;
    totalProducts: number;
    monthlySales: number;
  };
}

const StockContext = createContext<StockContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', description: 'Gadgets and devices' },
  { id: '2', name: 'Furniture', description: 'Office and home furniture' },
  { id: '3', name: 'Office Supplies', description: 'Stationery and essentials' },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', sku: 'LAP-001', name: 'Pro Laptop 15"', categoryId: '1', price: 1200, cost: 900, quantity: 15, minLevel: 5, supplier: 'TechDistro Inc.' },
  { id: '2', sku: 'MOU-002', name: 'Wireless Mouse', categoryId: '1', price: 25, cost: 12, quantity: 50, minLevel: 10, supplier: 'TechDistro Inc.' },
  { id: '3', sku: 'CHR-101', name: 'Ergo Chair', categoryId: '2', price: 250, cost: 150, quantity: 8, minLevel: 10, supplier: 'FurniWorld' },
  { id: '4', sku: 'DSK-202', name: 'Standing Desk', categoryId: '2', price: 450, cost: 300, quantity: 3, minLevel: 5, supplier: 'FurniWorld' },
];

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from local storage or use initial data
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('stock_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('stock_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('stock_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('stock_categories', JSON.stringify(categories));
    localStorage.setItem('stock_products', JSON.stringify(products));
    localStorage.setItem('stock_transactions', JSON.stringify(transactions));
  }, [categories, products, transactions]);

  // Actions
  const addProduct = (data: Omit<Product, 'id'>) => {
    const newProduct = { ...data, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = (data: Omit<Category, 'id'>) => {
    setCategories([...categories, { ...data, id: Date.now().toString() }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const recordSale = (data: { customer: string; items: { productId: string; quantity: number }[] }) => {
    const transactionItems: any[] = [];
    let total = 0;
    
    // Update stock and calculate total
    const updatedProducts = products.map(p => {
      const item = data.items.find(i => i.productId === p.id);
      if (item) {
        if (p.quantity < item.quantity) throw new Error(`Insufficient stock for ${p.name}`);
        total += p.price * item.quantity;
        transactionItems.push({
          productId: p.id,
          productName: p.name,
          quantity: item.quantity,
          price: p.price
        });
        return { ...p, quantity: p.quantity - item.quantity };
      }
      return p;
    });

    setProducts(updatedProducts);
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'SALE',
      date: new Date().toISOString(),
      items: transactionItems,
      totalAmount: total,
      customerOrSupplier: data.customer,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
    };

    setTransactions([transaction, ...transactions]);
  };

  const recordPurchase = (data: { supplier: string; invoice: string; items: { productId: string; quantity: number; cost: number }[] }) => {
    const transactionItems: any[] = [];
    let total = 0;

    const updatedProducts = products.map(p => {
      const item = data.items.find(i => i.productId === p.id);
      if (item) {
        total += item.cost * item.quantity;
        transactionItems.push({
          productId: p.id,
          productName: p.name,
          quantity: item.quantity,
          price: item.cost
        });
        // Update quantity and moving average cost (simplified here to just updating latest cost)
        return { ...p, quantity: p.quantity + item.quantity, cost: item.cost }; 
      }
      return p;
    });

    setProducts(updatedProducts);

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'PURCHASE',
      date: new Date().toISOString(),
      items: transactionItems,
      totalAmount: total,
      customerOrSupplier: data.supplier,
      invoiceNumber: data.invoice
    };

    setTransactions([transaction, ...transactions]);
  };

  // Derived Stats
  const stats = {
    totalValue: products.reduce((acc, p) => acc + (p.price * p.quantity), 0),
    lowStockCount: products.filter(p => p.quantity <= p.minLevel).length,
    totalProducts: products.length,
    monthlySales: transactions
      .filter(t => t.type === 'SALE' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((acc, t) => acc + t.totalAmount, 0)
  };

  return (
    <StockContext.Provider value={{
      products, categories, transactions,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      recordSale, recordPurchase,
      stats
    }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) throw new Error('useStock must be used within a StockProvider');
  return context;
};
