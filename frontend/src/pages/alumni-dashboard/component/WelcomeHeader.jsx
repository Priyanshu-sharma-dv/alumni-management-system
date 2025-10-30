import React from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';

const WelcomeHeader = ({ user }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.firstName || (user?.name ? user.name.split(' ')[0] : '');
  const avatarSrc = user?.avatar || user?.profileImage || (user?.profile_image ? `/uploads/${user.profile_image}` : undefined);

  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/20">
            <Image 
              src={avatarSrc} 
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{getGreeting()}, {displayName}!</h1>
            <p className="text-white/80 text-sm">
              {user?.title} • Class of {user?.graduationYear}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-white/70" />
                <span className="text-xs text-white/70">{user?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-white/70" />
                <span className="text-xs text-white/70">{user?.connections} connections</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{user?.impactScore}</div>
            <div className="text-xs text-white/80">Impact Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WelcomeHeader;