import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UtensilsCrossed, Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login — any credentials work
    toast.success('Logged in as Admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground mb-4">
            <UtensilsCrossed className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl font-bold">QR-Order Pro</h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Panel Login</p>
        </div>
        <form onSubmit={handleLogin} className="bg-card rounded-2xl border p-6 space-y-4 shadow-sm">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@restaurant.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full h-11 gap-2 font-display font-semibold">
            <Lock className="h-4 w-4" />
            Sign In
          </Button>
          <p className="text-xs text-center text-muted-foreground">Demo: any credentials will work</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
