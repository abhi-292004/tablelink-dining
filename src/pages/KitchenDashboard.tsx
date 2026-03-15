import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';
import { OrderStatus } from '@/types/restaurant';
import { ChefHat, Clock, CheckCircle2, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const COLUMNS: { status: OrderStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { status: 'Pending', label: 'New Orders', icon: <Clock className="h-5 w-5" />, color: 'text-warning' },
  { status: 'Preparing', label: 'Preparing', icon: <ChefHat className="h-5 w-5" />, color: 'text-info' },
  { status: 'Ready', label: 'Ready to Serve', icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-success' },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Served',
};

const KitchenDashboard = () => {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b px-6 py-4 flex items-center gap-3">
        <ChefHat className="h-7 w-7 text-primary" />
        <h1 className="font-display text-2xl font-bold">Kitchen Dashboard</h1>
        <span className="ml-auto text-sm text-muted-foreground">
          {orders.filter(o => o.status === 'Pending').length} pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6">
        {COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col.status);
          return (
            <div key={col.status} className="space-y-3">
              <div className={`flex items-center gap-2 px-1 ${col.color}`}>
                {col.icon}
                <h2 className="font-display font-bold">{col.label}</h2>
                <span className="ml-auto bg-secondary rounded-full px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {colOrders.length}
                </span>
              </div>

              <AnimatePresence>
                {colOrders.map(order => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`rounded-xl border bg-card p-4 shadow-sm ${col.status === 'Pending' ? 'pulse-new' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-lg">Table {order.tableNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="font-medium">{item.menuItem.image} {item.menuItem.name}</span>
                          <span className="text-muted-foreground">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    {NEXT_STATUS[order.status] && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, NEXT_STATUS[order.status]!)}
                        className="w-full h-10 font-display font-semibold"
                        variant={col.status === 'Pending' ? 'default' : 'outline'}
                      >
                        {col.status === 'Pending' ? 'Start Preparing' : col.status === 'Preparing' ? 'Mark Ready' : 'Served'}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {colOrders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm rounded-xl border border-dashed">
                  No {col.label.toLowerCase()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenDashboard;
