import { useOrders } from '@/context/OrderContext';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/types/restaurant';

interface OrderTrackerProps {
  tableNumber: number;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: 'bg-warning/10 text-warning border-warning/30',
  Preparing: 'bg-info/10 text-info border-info/30',
  Ready: 'bg-success/10 text-success border-success/30',
  Served: 'bg-muted text-muted-foreground border-border',
};

export const OrderTracker = ({ tableNumber }: OrderTrackerProps) => {
  const { getOrdersByTable } = useOrders();
  const orders = getOrdersByTable(tableNumber);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <span className="text-4xl block mb-2">📋</span>
        <p className="text-sm">No orders yet for this table</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map(order => (
        <div key={order.id} className={`rounded-lg border p-4 ${STATUS_STYLES[order.status]}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-semibold text-sm">#{order.id.slice(-4)}</span>
            <Badge variant="outline" className="text-xs font-medium">{order.status}</Badge>
          </div>
          <div className="space-y-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span>{item.menuItem.name} × {item.quantity}</span>
                <span>₹{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
