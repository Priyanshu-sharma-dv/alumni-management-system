// src/components/ui/Button.jsx
import React from "react";
import Icon from "../AppIcon";

const Button = ({ 
  children, 
  variant = "default", 
  size = "md", 
  iconName, 
  iconPosition = "left",
  className = "", 
  loading = false,
  fullWidth = false,
  ...props 
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  // Icon with position handling
  const renderIcon = () => {
    if (!iconName) return null;
    const iconClass = iconPosition === 'right' ? 'ml-2' : 'mr-2';
    return <Icon name={iconName} size={16} className={iconClass} />;
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          {children}
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </button>
  );
};

export default Button;
