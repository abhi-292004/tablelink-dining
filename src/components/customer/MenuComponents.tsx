import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, MenuCategory, CATEGORY_LABELS } from '@/types/restaurant';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.menuItem.id === item.id);
  const qty = cartItem?.quantity || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 rounded-lg bg-card p-3 shadow-sm border transition-all ${!item.isAvailable ? 'opacity-50' : ''}`}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-secondary text-3xl">
        {item.image}
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-sm leading-tight truncate">{item.name}</h3>
            {!item.isAvailable && (
              <Badge variant="destructive" className="shrink-0 text-[10px] px-1.5 py-0">Out</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display font-bold text-primary">₹{item.price}</span>
          {item.isAvailable && (
            <div className="flex items-center gap-1">
              {qty > 0 && (
                <>
                  <button
                    onClick={() => updateQuantity(item.id, qty - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <motion.span
                    key={qty}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="w-6 text-center font-semibold text-sm"
                  >
                    {qty}
                  </motion.span>
                </>
              )}
              <button
                onClick={() => addItem(item)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface CategoryBarProps {
  active: MenuCategory | 'all';
  onSelect: (cat: MenuCategory | 'all') => void;
}

export const CategoryBar = ({ active, onSelect }: CategoryBarProps) => {
  const cats: (MenuCategory | 'all')[] = ['all', 'starters', 'main-course', 'drinks', 'desserts'];
  const labels: Record<string, string> = { all: 'All', ...CATEGORY_LABELS };

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b px-4 py-2 -mx-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === cat
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {labels[cat]}
          </button>
        ))}
      </div>
    </div>
  );
};

interface FloatingCartButtonProps {
  onClick: () => void;
}

export const FloatingCartButton = ({ onClick }: FloatingCartButtonProps) => {
  const { totalItems, totalAmount } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-4 right-4 z-30 max-w-lg mx-auto"
    >
      <Button
        onClick={onClick}
        className="w-full h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 text-base font-display font-semibold flex items-center justify-between px-6"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
        </div>
        <span>${totalAmount.toFixed(2)}</span>
      </Button>
    </motion.div>
  );
};
