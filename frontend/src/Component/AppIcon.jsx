// src/components/AppIcon.jsx
import React from "react";
import * as Icons from "lucide-react"; // npm install lucide-react

const AppIcon = ({ name, size = 24, color = "currentColor", className = "", ...props }) => {
  const LucideIcon = Icons[name] || Icons['CircleAlert'];
  if (!Icons[name]) {
    console.warn(`Icon "${name}" not found in lucide-react`);
  }
  return <LucideIcon size={size} color={color} className={className} {...props} />;
};

export default AppIcon;
