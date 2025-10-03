import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  Settings, 
  CreditCard, 
  Menu, 
  X, 
  Coins,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/hooks/useCredits';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { credits, loading, refreshBalance } = useCredits();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Manual refresh credits
  const handleRefreshCredits = async () => {
    setRefreshing(true);
    try {
      await refreshBalance();
      toast.success('Credits refreshed!');
    } catch (error) {
      toast.error('Failed to refresh credits');
    } finally {
      setRefreshing(false);
    }
  };

  // Listen for credit balance updates
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      console.log('📊 Navbar received balance update:', event.detail);
    };

    window.addEventListener('creditBalanceUpdate', handleBalanceUpdate as EventListener);
    
    return () => {
      window.removeEventListener('creditBalanceUpdate', handleBalanceUpdate as EventListener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error during logout');
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/apply', label: 'Apply for Visa' },
    { path: '/ai/trip-planner', label: 'AI Trip Planner' },
    { path: '/ai/document-checker', label: 'AI Document Checker' },
    { path: '/purchase-credits', label: 'Pricing' },
    { path: '/support', label: 'Support' },
    { path: '/about', label: 'About' }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getCreditColor = () => {
    if (loading) return 'bg-gray-500';
    if (credits <= 10) return 'bg-red-500 animate-pulse';
    if (credits <= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCreditText = () => {
    if (loading) return 'Loading...';
    return `${credits}`;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TV</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ThaiVisa.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Credit Display */}
            {user && (
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className={`${getCreditColor()} text-white font-semibold px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={handleRefreshCredits}
                  title="Click to refresh credits"
                >
                  <Coins className="w-3 h-3 mr-1" />
                  {getCreditText()}
                  {refreshing && <RefreshCw className="w-3 h-3 ml-1 animate-spin" />}
                </Badge>
                
                {/* Low credits warning */}
                {!loading && credits <= 20 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => navigate('/purchase-credits')}
                  >
                    Buy Credits
                  </Button>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/purchase-credits')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Purchase Credits
                    <Badge variant="secondary" className="ml-auto">
                      {credits}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;