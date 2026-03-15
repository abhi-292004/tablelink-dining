export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isAvailable: boolean;
}

export type MenuCategory = 'starters' | 'main-course' | 'drinks' | 'desserts';

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  'starters': 'Starters',
  'main-course': 'Main Course',
  'drinks': 'Drinks',
  'desserts': 'Desserts',
};

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served';

export interface Order {
  id: string;
  tableNumber: number;
  items: { menuItem: MenuItem; quantity: number }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Table {
  id: string;
  tableNumber: number;
  isActive: boolean;
}
