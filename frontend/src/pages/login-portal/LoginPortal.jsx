import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import RoleSelector from './component/RoleSelector';
import LoginForm from './component/LoginForm';
import RegistrationForm from './component/RegistrationForm';
import SecurityFeatures from './component/SecurityFeatures';

const LoginPortal = () => {
  const [currentView, setCurrentView] = useState('role-selection'); // role-selection, login, register, security
  const [selectedRole, setSelectedRole] = useState('');
  const [isFormToggled, setIsFormToggled] = useState(false);
  const [showSecurityFeatures, setShowSecurityFeatures] = useState(false);

  useEffect(() => {
    // Auto-show security features after 30 seconds of inactivity
    const timer = setTimeout(() => {
      if (currentView === 'role-selection') {
        setShowSecurityFeatures(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [currentView]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleToggleForm = () => {
    setIsFormToggled(!isFormToggled);
    setCurrentView(isFormToggled ? 'login' : 'register');
  };

  const handleBackToRoleSelection = () => {
    setCurrentView('role-selection');
    setSelectedRole('');
    setIsFormToggled(false);
  };

  const handleShowSecurity = () => {
    setCurrentView('security');
  };

  const handleBackFromSecurity = () => {
    setCurrentView('role-selection');
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      alumni: 'Alumni',
      student: 'Student',
      admin: 'Staff'
    };
    return roleNames?.[selectedRole] || 'User';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
              <div>
                <h1 className="text-xl font-bold text-foreground">AlumniConnect</h1>
                <p className="text-xs text-muted-foreground -mt-1">Pro</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="Shield"
                iconPosition="left"
                onClick={handleShowSecurity}
                className="hidden sm:flex"
              >
                Security
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Branding & Information */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="max-w-lg">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                  <Icon name="Users" size={40} className="text-white" />
                </div>
                
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Welcome to Your
                  <span className="text-gradient-primary block">Alumni Community</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Connect with fellow alumni, find mentorship opportunities, advance your career, 
                  and give back to your alma mater through our comprehensive engagement platform.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Network" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Professional Networking</h3>
                    <p className="text-muted-foreground">
                      Connect with 50,000+ alumni across industries and build meaningful professional relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="UserCheck" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Mentorship Programs</h3>
                    <p className="text-muted-foreground">
                      Get guidance from experienced professionals or share your expertise with the next generation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Career Advancement</h3>
                    <p className="text-muted-foreground">
                      Access exclusive job opportunities, career resources, and professional development programs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-conversion-accent rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Alumni testimonial"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Michael Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Class of 2018, Software Engineer at Google</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "AlumniConnect helped me find my mentor and land my dream job. The community support is incredible!"
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Navigation Breadcrumb */}
            {(currentView === 'login' || currentView === 'register') && (
              <div className="mb-6">
                <button
                  onClick={handleBackToRoleSelection}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} />
                  <span className="text-sm">Back to role selection</span>
                </button>
                
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Role:</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                    {getRoleDisplayName()}
                  </span>
                </div>
              </div>
            )}

            {currentView === 'security' && (
              <div className="mb-6">
                <button
                  onClick={handleBackFromSecurity}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} />
                  <span className="text-sm">Back to login</span>
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
              {currentView === 'role-selection' && (
                <RoleSelector
                  selectedRole={selectedRole}
                  onRoleSelect={handleRoleSelect}
                />
              )}

              {currentView === 'login' && (
                <LoginForm
                  selectedRole={selectedRole}
                  onToggleForm={handleToggleForm}
                />
              )}

              {currentView === 'register' && (
                <RegistrationForm
                  selectedRole={selectedRole}
                  onToggleForm={handleToggleForm}
                />
              )}

              {currentView === 'security' && (
                <SecurityFeatures />
              )}
            </div>

            {/* Security Features Prompt */}
            {showSecurityFeatures && currentView === 'role-selection' && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Enhanced Security Available</p>
                      <p className="text-xs text-muted-foreground">Learn about our advanced security features</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShowSecurity}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View
                  </Button>
                </div>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link to="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </div>
              
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} AlumniConnect Pro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Security Features */}
      <div className="lg:hidden">
        {showSecurityFeatures && currentView === 'role-selection' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Security Features</h3>
                <button
                  onClick={() => setShowSecurityFeatures(false)}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <SecurityFeatures />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPortal;