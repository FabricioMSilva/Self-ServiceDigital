// Tipos de usuário e autenticação
export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de produtos/serviços
export type ServiceType = "web" | "android" | "sistema";
export type ServiceCategory = "base" | "extra";

export interface Service {
  id: string;
  label: string;
  price: number;
  category: ServiceCategory;
  description?: string;
  type?: ServiceType;
}

// Tipos de carrinho
export interface CartItem {
  id: string;
  label: string;
  price: number;
  quantity: number;
  category: ServiceCategory;
  type?: ServiceType;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
}

// Tipos de pedido
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "card" | "boleto" | "pix";
  paymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de contato
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

// Tipos de resposta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
