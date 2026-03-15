import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { Minus, Plus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface CartViewProps {
  tableNumber: number;
  onBack: () => void;
}

export const CartView = ({ tableNumber, onBack }: CartViewProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalAmount } = useCart();
  const { addOrder } = useOrders();
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    const order = {
      id: `ord-${Date.now()}`,
      tableNumber,
      items: items.map(i => ({ menuItem: i.menuItem, quantity: i.quantity })),
      totalAmount,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setPlaced(true);
    toast.success('Order placed successfully!');
  };

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold">Order Placed!</h2>
        <p className="text-muted-foreground">Your order has been sent to the kitchen. Sit tight!</p>
        <Button onClick={() => { setPlaced(false); onBack(); }} variant="outline" className="mt-4">
          Back to Menu
        </Button>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <span className="text-6xl">🛒</span>
        <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm">Add some delicious items from the menu</p>
        <Button onClick={onBack} variant="outline">Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-display font-bold text-lg">Your Cart</h2>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3">
        {items.map(({ menuItem, quantity }) => (
          <motion.div
            key={menuItem.id}
            layout
            className="flex items-center gap-3 rounded-lg bg-card p-3 border shadow-sm"
          >
            <div className="text-2xl w-10 text-center">{menuItem.image}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{menuItem.name}</h4>
              <span className="text-sm text-primary font-display font-bold">
                ${(menuItem.price * quantity).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => removeItem(menuItem.id)}
                className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 border-t bg-card px-4 py-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-display font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${totalAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-display font-bold text-base hover:bg-accent/90"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};
