import React from 'react';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'update-profile',
      label: 'Update Profile',
      icon: 'User',
      color: 'bg-blue-500',
      description: 'Keep your information current'
    },
    {
      id: 'find-alumni',
      label: 'Find Alumni',
      icon: 'Search',
      color: 'bg-green-500',
      description: 'Discover new connections'
    },
    {
      id: 'create-event',
      label: 'Create Event',
      icon: 'Calendar',
      color: 'bg-orange-500',
      description: 'Organize alumni events'
    },
    {
      id: 'create-mentorship',
      label: 'Create Mentorship',
      icon: 'UserCheck',
      color: 'bg-teal-500',
      description: 'Offer mentorship opportunities'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
            onClick={() => onActionClick(action?.id)}
          >
            <div className={`w-12 h-12 ${action?.color} rounded-full flex items-center justify-center mb-2`}>
              <Icon name={action?.icon} size={20} className="text-white" />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm text-foreground">{action?.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;