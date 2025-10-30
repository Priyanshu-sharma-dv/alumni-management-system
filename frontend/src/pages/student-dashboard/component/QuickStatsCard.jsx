import React from 'react';
import Icon from '@/Component/AppIcon';

const QuickStatsCard = ({ title, value, change, icon, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      secondary: 'bg-secondary/10 text-secondary',
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      error: 'bg-red-100 text-red-600',
      info: 'bg-blue-100 text-blue-600'
    };
    return colors?.[colorName] || colors?.primary;
  };

  const getChangeColor = (changeValue) => {
    if (changeValue > 0) return 'text-green-600';
    if (changeValue < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (changeValue) => {
    if (changeValue > 0) return 'TrendingUp';
    if (changeValue < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon || 'Info'} size={24} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor(change)}`}>
            <Icon name={getChangeIcon(change)} size={14} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
    </div>
  );
};

export default QuickStatsCard;