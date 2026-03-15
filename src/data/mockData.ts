import { MenuItem, Order, Table } from '@/types/restaurant';

export const MOCK_MENU: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, basil & garlic', price: 8.99, category: 'starters', image: '🍅', isAvailable: true },
  { id: '2', name: 'Garlic Prawns', description: 'Sautéed prawns in chili garlic butter', price: 12.99, category: 'starters', image: '🦐', isAvailable: true },
  { id: '3', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili', price: 7.49, category: 'starters', image: '🥟', isAvailable: true },
  { id: '4', name: 'Soup of the Day', description: 'Chef\'s special cream soup', price: 6.99, category: 'starters', image: '🍲', isAvailable: false },
  { id: '5', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herb sauce & veggies', price: 22.99, category: 'main-course', image: '🐟', isAvailable: true },
  { id: '6', name: 'Ribeye Steak', description: '300g ribeye with truffle mash & jus', price: 32.99, category: 'main-course', image: '🥩', isAvailable: true },
  { id: '7', name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms', price: 18.49, category: 'main-course', image: '🍄', isAvailable: true },
  { id: '8', name: 'Chicken Parmesan', description: 'Breaded chicken with marinara & mozzarella', price: 19.99, category: 'main-course', image: '🍗', isAvailable: true },
  { id: '9', name: 'Craft Lemonade', description: 'Freshly squeezed with mint & honey', price: 4.99, category: 'drinks', image: '🍋', isAvailable: true },
  { id: '10', name: 'Espresso', description: 'Double-shot Italian espresso', price: 3.49, category: 'drinks', image: '☕', isAvailable: true },
  { id: '11', name: 'Mango Smoothie', description: 'Fresh mango blended with yogurt', price: 5.99, category: 'drinks', image: '🥭', isAvailable: true },
  { id: '12', name: 'Sparkling Water', description: '500ml premium sparkling water', price: 2.99, category: 'drinks', image: '💧', isAvailable: true },
  { id: '13', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 9.99, category: 'desserts', image: '🍰', isAvailable: true },
  { id: '14', name: 'Chocolate Lava Cake', description: 'Warm cake with molten chocolate center', price: 11.49, category: 'desserts', image: '🍫', isAvailable: true },
  { id: '15', name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar top', price: 8.99, category: 'desserts', image: '🍮', isAvailable: true },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    tableNumber: 3,
    items: [
      { menuItem: MOCK_MENU[0], quantity: 2 },
      { menuItem: MOCK_MENU[5], quantity: 1 },
      { menuItem: MOCK_MENU[9], quantity: 2 },
    ],
    totalAmount: 56.95,
    status: 'Pending',
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'ord-002',
    tableNumber: 7,
    items: [
      { menuItem: MOCK_MENU[6], quantity: 2 },
      { menuItem: MOCK_MENU[12], quantity: 2 },
    ],
    totalAmount: 56.96,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'ord-003',
    tableNumber: 1,
    items: [
      { menuItem: MOCK_MENU[4], quantity: 1 },
      { menuItem: MOCK_MENU[10], quantity: 1 },
    ],
    totalAmount: 28.98,
    status: 'Ready',
    createdAt: new Date(Date.now() - 1200000).toISOString(),
  },
];

export const MOCK_TABLES: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `table-${i + 1}`,
  tableNumber: i + 1,
  isActive: true,
}));
