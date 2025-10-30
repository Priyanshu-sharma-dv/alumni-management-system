import React from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'connection': 'UserPlus',
      'event': 'Calendar',
      'job': 'Briefcase',
      'donation': 'Heart',
      'mentorship': 'UserCheck',
      'achievement': 'Trophy'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'connection': 'text-blue-600',
      'event': 'text-purple-600',
      'job': 'text-green-600',
      'donation': 'text-red-600',
      'mentorship': 'text-orange-600',
      'achievement': 'text-yellow-600'
    };
    return colorMap?.[type] || 'text-gray-600';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {activity?.user && (
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={activity?.user?.avatar} 
                      alt={activity?.user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">{activity?.user?.name}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
              
              {activity?.actionable && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="xs">
                    {activity?.primaryAction}
                  </Button>
                  {activity?.secondaryAction && (
                    <Button variant="ghost" size="xs">
                      {activity?.secondaryAction}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" className="w-full">
          View All Activities
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;