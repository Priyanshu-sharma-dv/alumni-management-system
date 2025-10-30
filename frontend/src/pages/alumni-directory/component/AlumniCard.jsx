import React, { useState } from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';

const AlumniCard = ({ alumni, onConnect, onMessage, onViewProfile }) => {
  const [connectionStatus, setConnectionStatus] = useState(alumni?.connectionStatus || 'none');

  const handleConnect = () => {
    if (connectionStatus === 'none') {
      setConnectionStatus('pending');
      onConnect?.(alumni?.id);
    }
  };

  const handleMessage = () => onMessage?.(alumni?.id);
  const handleViewProfile = () => onViewProfile?.(alumni?.id);

  const getConnectionButton = () => {
    const buttonProps = {
      variant: 'outline',
      size: 'sm',
      iconPosition: 'left',
      disabled: connectionStatus !== 'none',
    };

    if (connectionStatus === 'connected')
      return <Button {...buttonProps} iconName="UserCheck">Connected</Button>;

    if (connectionStatus === 'pending')
      return <Button {...buttonProps} iconName="Clock">Pending</Button>;

    return (
      <Button variant="default" size="sm" iconName="UserPlus" iconPosition="left" onClick={handleConnect}>
        Connect
      </Button>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img src={alumni?.profileImage} alt={alumni?.name} className="w-16 h-16 rounded-full object-cover" />
          {alumni?.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-card rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground truncate">{alumni?.name}</h3>
              <p className="text-sm text-muted-foreground">Class of {alumni?.graduationYear}</p>
            </div>
            {alumni?.mentorshipAvailable && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full whitespace-nowrap">
                <Icon name="UserCheck" size={12} className="inline mr-1" /> Mentor
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="space-y-2 mb-4">
        {alumni?.currentPosition && (
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{alumni.currentPosition}</span>
          </div>
        )}
        {alumni?.company && (
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{alumni.company}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {getConnectionButton()}
        <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left" onClick={handleMessage}>
          Message
        </Button>
        <Button variant="ghost" size="sm" iconName="Eye" onClick={handleViewProfile}>
          View Profile
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            {alumni?.linkedinUrl && (
              <a
                href={alumni.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="Linkedin" size={12} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button aria-label="Bookmark Alumni" className="p-1 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Bookmark" size={12} />
            </button>
            <button aria-label="Share Alumni" className="p-1 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Share" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;
