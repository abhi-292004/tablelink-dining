import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_MENU } from '@/data/mockData';
import { MenuCategory } from '@/types/restaurant';
import { CategoryBar, MenuItemCard, FloatingCartButton } from '@/components/customer/MenuComponents';
import { CartView } from '@/components/customer/CartView';
import { OrderTracker } from '@/components/customer/OrderTracker';
import { UtensilsCrossed, ClipboardList } from 'lucide-react';

type View = 'menu' | 'cart' | 'orders';

const TableMenuPage = () => {
  const { tableId } = useParams();
  const tableNumber = parseInt(tableId || '1', 10);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [view, setView] = useState<View>('menu');

  const filteredItems = activeCategory === 'all'
    ? MOCK_MENU
    : MOCK_MENU.filter(item => item.category === activeCategory);

  if (view === 'cart') {
    return <CartView tableNumber={tableNumber} onBack={() => setView('menu')} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-8 pb-4 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80 font-medium">Table {tableNumber}</p>
            <h1 className="font-display text-2xl font-bold">Our Menu</h1>
          </div>
          <button
            onClick={() => setView(view === 'orders' ? 'menu' : 'orders')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
          >
            {view === 'orders' ? <UtensilsCrossed className="h-5 w-5" /> : <ClipboardList className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {view === 'orders' ? (
        <div className="px-4 py-4">
          <h2 className="font-display font-bold text-lg mb-3">Your Orders</h2>
          <OrderTracker tableNumber={tableNumber} />
        </div>
      ) : (
        <div className="px-4">
          <CategoryBar active={activeCategory} onSelect={setActiveCategory} />
          <div className="grid gap-3 py-4">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {view === 'menu' && <FloatingCartButton onClick={() => setView('cart')} />}
    </div>
  );
};

export default TableMenuPage;
