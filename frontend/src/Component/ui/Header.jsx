import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', path: '/alumni-dashboard', icon: 'LayoutDashboard' },
    { name: 'Directory', path: '/alumni-directory', icon: 'Users' },
    { name: 'Events', path: '/events', icon: 'Calendar' },
    { name: 'Mentorship', path: '/mentorship', icon: 'UserCheck' },
    { name: 'Resources', path: '/resources', icon: 'BookOpen' }
  ];

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Admin', path: '/admin-dashboard', icon: 'Shield' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('token');
      sessionStorage.clear();
    } catch (_) {}
    // Hard reload to reset any in-memory state
    window.location.href = '/login-portal';
  };

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-50 ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/homepage" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7L12 12L21 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 17L12 22L21 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 12L12 17L21 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">AlumniConnect</h1>
                <p className="text-xs text-muted-foreground -mt-1">Pro</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {navigationItems?.slice(4)?.concat(secondaryItems)?.map((item) => (
                    <Link
                      key={item?.name}
                      to={item?.path}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-trust-builder rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground hidden sm:block" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-1 border-border" />
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-2 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              <hr className="my-2 border-border" />
              
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;