import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import Input from "@/Component/ui/Input";
import { Checkbox } from "@/Component/ui/Checkbox";
import { authAPI } from "@/utils/api";

const LoginForm = ({ selectedRole, onToggleForm, className = '' }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Submit to backend
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authAPI.login(formData.email, formData.password);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        // redirect based on role
        const dashboardRoutes = {
          alumni: '/alumni-dashboard',
          student: '/student-dashboard',
          admin: '/admin-dashboard'
        };
        window.location.href = dashboardRoutes[data.user?.role] || '/student-dashboard';
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Network error');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getRoleDisplayName = () => {
    const roleNames = { alumni: 'Alumni', student: 'Student', admin: 'Staff' };
    return roleNames[selectedRole] || 'User';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your {getRoleDisplayName()} account
        </p>
      </div>

      <form onSubmit={submitLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-muted-foreground"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {error && (
          <div className="p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Link to="/forgot-password" className="text-sm text-primary">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="justify-center"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-primary font-medium"
            disabled={isLoading}
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
