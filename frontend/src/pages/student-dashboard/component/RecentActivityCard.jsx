import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityCard = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return 'Send';
      case 'connection':
        return 'UserPlus';
      case 'event':
        return 'Calendar';
      case 'assessment':
        return 'CheckCircle';
      case 'message':
        return 'MessageCircle';
      case 'profile':
        return 'User';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'application':
        return 'text-blue-600';
      case 'connection':
        return 'text-green-600';
      case 'event':
        return 'text-orange-600';
      case 'assessment':
        return 'text-purple-600';
      case 'message':
        return 'text-pink-600';
      case 'profile':
        return 'text-gray-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-lg">Recent Activity</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(activity?.timestamp)}
              </p>
            </div>
            {activity?.actionable && (
              <button className="text-primary hover:text-primary/80 text-xs font-medium transition-colors duration-200">
                View
              </button>
            )}
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">No recent activity</p>
          <p className="text-muted-foreground text-xs mt-1">
            Start exploring opportunities to see your activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;