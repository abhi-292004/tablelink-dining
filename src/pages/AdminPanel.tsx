import { useState } from 'react';
import { MOCK_MENU, MOCK_TABLES } from '@/data/mockData';
import { useOrders } from '@/context/OrderContext';
import { MenuItem, OrderStatus, CATEGORY_LABELS, MenuCategory } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { QRCodeSVG } from 'qrcode.react';
import {
  LayoutDashboard, UtensilsCrossed, ClipboardList, QrCode, LogOut,
  Plus, Pencil, Trash2, DollarSign, ShoppingCart, TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AdminTab = 'dashboard' | 'menu' | 'orders' | 'tables';

const NAV_ITEMS: { tab: AdminTab; label: string; icon: React.ReactNode }[] = [
  { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { tab: 'menu', label: 'Menu', icon: <UtensilsCrossed className="h-5 w-5" /> },
  { tab: 'orders', label: 'Orders', icon: <ClipboardList className="h-5 w-5" /> },
  { tab: 'tables', label: 'Tables & QR', icon: <QrCode className="h-5 w-5" /> },
];

const STATUS_BADGE: Record<OrderStatus, string> = {
  Pending: 'bg-warning/15 text-warning',
  Preparing: 'bg-info/15 text-info',
  Ready: 'bg-success/15 text-success',
  Served: 'bg-muted text-muted-foreground',
};

const AdminPanel = () => {
  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU);
  const { orders, updateOrderStatus } = useOrders();

  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-card border-r">
        <div className="p-5 border-b">
          <h1 className="font-display text-xl font-bold flex items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-lg p-1.5"><UtensilsCrossed className="h-5 w-5" /></span>
            QR-Order Pro
          </h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(n => (
            <button
              key={n.tab}
              onClick={() => setTab(n.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === n.tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-card border-t flex">
        {NAV_ITEMS.map(n => (
          <button
            key={n.tab}
            onClick={() => setTab(n.tab)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium ${
              tab === n.tab ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="p-4 md:p-6">
          {tab === 'dashboard' && <DashboardView orders={orders} totalRevenue={totalRevenue} menuItems={menuItems} />}
          {tab === 'menu' && <MenuManagement items={menuItems} setItems={setMenuItems} />}
          {tab === 'orders' && <OrderManagement orders={orders} updateStatus={updateOrderStatus} />}
          {tab === 'tables' && <TableManagement />}
        </div>
      </main>
    </div>
  );
};

function DashboardView({ orders, totalRevenue, menuItems }: any) {
  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: <DollarSign className="h-5 w-5" />, color: 'text-primary' },
    { label: 'Total Orders', value: orders.length, icon: <ShoppingCart className="h-5 w-5" />, color: 'text-accent' },
    { label: 'Menu Items', value: menuItems.length, icon: <UtensilsCrossed className="h-5 w-5" />, color: 'text-info' },
    { label: 'Pending', value: orders.filter((o: any) => o.status === 'Pending').length, icon: <TrendingUp className="h-5 w-5" />, color: 'text-warning' },
  ];
  return (
    <>
      <h2 className="font-display text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-card rounded-xl border p-4">
            <div className={`mb-2 ${s.color}`}>{s.icon}</div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function MenuManagement({ items, setItems }: { items: MenuItem[]; setItems: (items: MenuItem[]) => void }) {
  const toggleAvailability = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
    toast.success('Item updated');
  };
  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    toast.success('Item deleted');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Menu Management</h2>
        <AddMenuItemDialog onAdd={(item) => { setItems([...items, item]); toast.success('Item added'); }} />
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 bg-card rounded-lg border p-3">
            <span className="text-2xl w-10 text-center">{item.image}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                <Badge variant="outline" className="text-[10px]">{CATEGORY_LABELS[item.category]}</Badge>
              </div>
              <span className="text-sm text-primary font-bold">₹{item.price}</span>
            </div>
            <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
            <button onClick={() => deleteItem(item.id)} className="text-destructive hover:text-destructive/80 p-1.5">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function AddMenuItemDialog({ onAdd }: { onAdd: (item: MenuItem) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MenuCategory>('starters');

  const handleAdd = () => {
    if (!name || !price) return;
    onAdd({
      id: `item-${Date.now()}`,
      name,
      description,
      price: parseFloat(price),
      category,
      image: '🍽️',
      isAvailable: true,
    });
    setOpen(false);
    setName(''); setDescription(''); setPrice('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5"><Plus className="h-4 w-4" />Add Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display">Add Menu Item</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Dish name" /></div>
          <div><Label>Description</Label><Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Price ($)</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" /></div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as MenuCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full">Add Item</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OrderManagement({ orders, updateStatus }: { orders: any[]; updateStatus: (id: string, s: OrderStatus) => void }) {
  const statuses: OrderStatus[] = ['Pending', 'Preparing', 'Ready', 'Served'];
  return (
    <>
      <h2 className="font-display text-2xl font-bold mb-6">All Orders</h2>
      <div className="space-y-3">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-card rounded-xl border p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-display font-bold">Table {order.tableNumber}</span>
                <span className="text-xs text-muted-foreground ml-2">#{order.id.slice(-4)}</span>
              </div>
              <Badge className={`${STATUS_BADGE[order.status as OrderStatus]} border-0`}>{order.status}</Badge>
            </div>
            <div className="text-sm space-y-1 mb-3">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.menuItem.name} × {item.quantity}</span>
                  <span className="text-muted-foreground">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-1 flex justify-between font-semibold">
                <span>Total</span><span className="text-primary">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {statuses.map(s => (
                <Button
                  key={s}
                  size="sm"
                  variant={order.status === s ? 'default' : 'outline'}
                  onClick={() => updateStatus(order.id, s)}
                  className="text-xs flex-1"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TableManagement() {
  const tables = MOCK_TABLES;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <h2 className="font-display text-2xl font-bold mb-6">Tables & QR Codes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map(table => (
          <div key={table.id} className="bg-card rounded-xl border p-4 flex flex-col items-center gap-3">
            <QRCodeSVG value={`${baseUrl}/table/${table.tableNumber}`} size={120} className="rounded" />
            <span className="font-display font-bold">Table {table.tableNumber}</span>
            <code className="text-[10px] text-muted-foreground break-all text-center">/table/{table.tableNumber}</code>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPanel;
