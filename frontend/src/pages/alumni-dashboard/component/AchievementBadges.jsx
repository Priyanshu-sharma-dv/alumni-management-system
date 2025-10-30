import React from 'react';
import Icon from '@/Component/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeIcon = (type) => {
    const iconMap = {
      'networking': 'Users',
      'mentorship': 'UserCheck',
      'donation': 'Heart',
      'event_attendance': 'Calendar',
      'career_milestone': 'Trophy',
      'community_service': 'Award'
    };
    return iconMap?.[type] || 'Star';
  };

  const getBadgeColor = (level) => {
    const colorMap = {
      'bronze': 'from-amber-400 to-amber-600',
      'silver': 'from-gray-400 to-gray-600',
      'gold': 'from-yellow-400 to-yellow-600',
      'platinum': 'from-purple-400 to-purple-600'
    };
    return colorMap?.[level] || 'from-blue-400 to-blue-600';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Achievement Badges</h2>
        <Icon name="Award" size={20} className="text-accent" />
      </div>
      {/* Earned Badges */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Earned Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements?.earned?.map((badge) => (
            <div key={badge?.id} className="text-center group cursor-pointer">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBadgeColor(badge?.level)} flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                <Icon name={getBadgeIcon(badge?.type)} size={24} className="text-white" />
              </div>
              <div className="text-xs font-medium text-foreground">{badge?.name}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(badge.earnedDate)?.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress Towards Next Badges */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">In Progress</h3>
        <div className="space-y-3">
          {achievements?.inProgress?.map((badge) => (
            <div key={badge?.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Icon name={getBadgeIcon(badge?.type)} size={16} className="text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{badge?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {badge?.currentProgress}/{badge?.requiredProgress}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(badge?.progressPercentage)}`}
                    style={{ width: `${badge?.progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1">
                  {badge?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{achievements?.stats?.totalEarned}</div>
            <div className="text-xs text-muted-foreground">Total Badges</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{achievements?.stats?.currentRank}</div>
            <div className="text-xs text-muted-foreground">Class Rank</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{achievements?.stats?.impactScore}</div>
            <div className="text-xs text-muted-foreground">Impact Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;