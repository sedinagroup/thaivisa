import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  LogOut, 
  CreditCard, 
  Menu, 
  X,
  Coins,
  FileCheck,
  Compass
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: t('nav.home'), href: '/', icon: null },
    { name: t('nav.apply'), href: '/apply', icon: FileCheck },
    { name: t('nav.aiDocumentChecker'), href: '/ai-document-checker', icon: FileCheck },
    { name: t('nav.aiTripPlanner'), href: '/ai-trip-planner', icon: Compass },
    { name: t('nav.credits'), href: '/credits', icon: Coins },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TV</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Thailand Visa AI
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User menu and language switcher */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {user ? (
              <>
                {/* Credits display */}
                <div className="hidden sm:flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    {user.credits}
                  </span>
                </div>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('nav.profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/credits" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>{t('nav.creditsAndBilling')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('nav.logOut')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('nav.signIn')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t('nav.getStarted')}</Link>
                </Button>
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
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('nav.credits')}</span>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Coins className="w-3 h-3" />
                        <span>{user.credits}</span>
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;