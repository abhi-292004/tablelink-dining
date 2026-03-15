import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, QrCode, ChefHat, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground px-6 pt-16 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-foreground/20 mb-5">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">QR-Order Pro</h1>
          <p className="text-primary-foreground/80 max-w-md mx-auto">
            Smart restaurant ordering system. Scan, order, and enjoy — no waiting for a waiter.
          </p>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="flex-1 px-6 py-8 max-w-lg mx-auto w-full space-y-4">
        <h2 className="font-display font-bold text-lg text-center mb-6">Quick Access</h2>

        <Link to="/table/1">
          <div className="bg-card rounded-2xl border p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Customer Menu</h3>
              <p className="text-sm text-muted-foreground">Try the menu as Table 1</p>
            </div>
          </div>
        </Link>

        <Link to="/kitchen">
          <div className="bg-card rounded-2xl border p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ChefHat className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Kitchen Dashboard</h3>
              <p className="text-sm text-muted-foreground">View & manage incoming orders</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/login">
          <div className="bg-card rounded-2xl border p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Admin Panel</h3>
              <p className="text-sm text-muted-foreground">Manage menu, orders & tables</p>
            </div>
          </div>
        </Link>
      </div>

      <footer className="text-center py-4 text-xs text-muted-foreground">
        Built with QR-Order Pro
      </footer>
    </div>
  );
};

export default Index;
