import React from 'react';
import Icon from '@/Component/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Network Connections',
      value: stats?.connections,
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Mentorship Sessions',
      value: stats?.mentorshipSessions,
      change: '+3',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Events Attended',
      value: stats?.eventsAttended,
      change: '+2',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Donations',
      value: `$${stats?.totalDonations?.toLocaleString()}`,
      change: '+$500',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;