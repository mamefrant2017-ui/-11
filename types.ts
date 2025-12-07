export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  price: number;
  cost: number;
  quantity: number;
  minLevel: number;
  supplier: string;
}

export interface Transaction {
  id: string;
  type: 'SALE' | 'PURCHASE';
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  customerOrSupplier: string; // Customer Name for Sale, Supplier for Purchase
  invoiceNumber: string;
}

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  role: string;
  qualification: string;
  department: string;
  image: string;
}

export interface ClassInfo {
  grade: string;
  subjects: string[];
  teacher: string;
  description: string;
}