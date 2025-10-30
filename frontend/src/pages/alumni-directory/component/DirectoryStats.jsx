import React from 'react';
import Icon from '@/Component/AppIcon';

const DirectoryStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Alumni',
      value: stats?.totalAlumni,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Available Mentors',
      value: stats?.availableMentors,
      icon: 'UserCheck',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Industries',
      value: stats?.industries,
      icon: 'Building',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Countries',
      value: stats?.countries,
      icon: 'Globe',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Active This Month',
      value: stats?.activeThisMonth,
      icon: 'Activity',
      color: 'text-trust-builder',
      bgColor: 'bg-trust-builder/10'
    },
    {
      label: 'New Connections',
      value: stats?.newConnections,
      icon: 'Link',
      color: 'text-conversion-accent',
      bgColor: 'bg-conversion-accent/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Directory Overview</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mb-2`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {typeof item?.value === 'number' ? item?.value?.toLocaleString() : item?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectoryStats;