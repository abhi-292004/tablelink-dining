import { MenuItem, Order, Table } from '@/types/restaurant';

export const MOCK_MENU: MenuItem[] = [
  // Starters
  { id: '1', name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled in tandoor with spices', price: 249, category: 'starters', image: '🧀', isAvailable: true },
  { id: '2', name: 'Samosa (2 pcs)', description: 'Crispy pastry filled with spiced potato & peas', price: 89, category: 'starters', image: '🥟', isAvailable: true },
  { id: '3', name: 'Chicken 65', description: 'Spicy deep-fried chicken with curry leaves & chillies', price: 279, category: 'starters', image: '🍗', isAvailable: true },
  { id: '4', name: 'Veg Manchurian', description: 'Indo-Chinese vegetable balls in tangy sauce', price: 199, category: 'starters', image: '🥘', isAvailable: true },
  { id: '5', name: 'Fish Amritsari', description: 'Crispy battered fish fillets with mint chutney', price: 329, category: 'starters', image: '🐟', isAvailable: false },
  // Main Course
  { id: '6', name: 'Butter Chicken', description: 'Tender chicken in creamy tomato-butter gravy', price: 349, category: 'main-course', image: '🍛', isAvailable: true },
  { id: '7', name: 'Dal Makhani', description: 'Slow-cooked black lentils with butter & cream', price: 229, category: 'main-course', image: '🫘', isAvailable: true },
  { id: '8', name: 'Mutton Biryani', description: 'Fragrant basmati rice layered with spiced mutton', price: 399, category: 'main-course', image: '🍚', isAvailable: true },
  { id: '9', name: 'Palak Paneer', description: 'Cottage cheese cubes in creamy spinach gravy', price: 249, category: 'main-course', image: '🥬', isAvailable: true },
  { id: '10', name: 'Chicken Tikka Masala', description: 'Grilled chicken in rich onion-tomato masala', price: 329, category: 'main-course', image: '🍖', isAvailable: true },
  { id: '11', name: 'Chole Bhature', description: 'Spiced chickpea curry with fluffy fried bread', price: 179, category: 'main-course', image: '🫓', isAvailable: true },
  // Drinks
  { id: '12', name: 'Masala Chai', description: 'Traditional spiced Indian tea with milk', price: 49, category: 'drinks', image: '☕', isAvailable: true },
  { id: '13', name: 'Mango Lassi', description: 'Chilled yogurt smoothie with Alphonso mango', price: 99, category: 'drinks', image: '🥭', isAvailable: true },
  { id: '14', name: 'Sweet Lime Soda', description: 'Fresh lime juice with soda & a hint of sugar', price: 69, category: 'drinks', image: '🍋', isAvailable: true },
  { id: '15', name: 'Cold Coffee', description: 'Chilled blended coffee with ice cream', price: 129, category: 'drinks', image: '🧊', isAvailable: true },
  // Desserts
  { id: '16', name: 'Gulab Jamun (2 pcs)', description: 'Soft milk-solid dumplings soaked in rose syrup', price: 99, category: 'desserts', image: '🟤', isAvailable: true },
  { id: '17', name: 'Rasmalai', description: 'Soft paneer discs in saffron-cardamom milk', price: 129, category: 'desserts', image: '🍮', isAvailable: true },
  { id: '18', name: 'Kulfi Falooda', description: 'Traditional Indian ice cream with vermicelli & rose syrup', price: 149, category: 'desserts', image: '🍨', isAvailable: true },
  { id: '19', name: 'Gajar Ka Halwa', description: 'Warm carrot pudding with nuts & khoya', price: 119, category: 'desserts', image: '🥕', isAvailable: true },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    tableNumber: 3,
    items: [
      { menuItem: MOCK_MENU[0], quantity: 2 },
      { menuItem: MOCK_MENU[5], quantity: 1 },
      { menuItem: MOCK_MENU[12], quantity: 2 },
    ],
    totalAmount: 249 * 2 + 349 + 99 * 2,
    status: 'Pending',
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'ord-002',
    tableNumber: 7,
    items: [
      { menuItem: MOCK_MENU[7], quantity: 2 },
      { menuItem: MOCK_MENU[15], quantity: 2 },
    ],
    totalAmount: 399 * 2 + 99 * 2,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'ord-003',
    tableNumber: 1,
    items: [
      { menuItem: MOCK_MENU[6], quantity: 1 },
      { menuItem: MOCK_MENU[13], quantity: 2 },
    ],
    totalAmount: 229 + 69 * 2,
    status: 'Ready',
    createdAt: new Date(Date.now() - 1200000).toISOString(),
  },
];

export const MOCK_TABLES: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `table-${i + 1}`,
  tableNumber: i + 1,
  isActive: true,
}));
