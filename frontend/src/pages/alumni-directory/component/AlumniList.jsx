import React from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';


const AlumniList = ({ alumni, onConnect, onMessage, onViewProfile }) => {
  const handleConnect = (alumniId) => {
    onConnect(alumniId);
  };

  const handleMessage = (alumniId) => {
    onMessage(alumniId);
  };

  const handleViewProfile = (alumniId) => {
    onViewProfile(alumniId);
  };

  return (
    <div className="space-y-4">
      {alumni?.map((person) => (
        <div
          key={person?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <Image
                src={person?.profileImage}
                alt={person?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {person?.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {person?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Class of {person?.graduationYear} • {person?.degree}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {person?.mentorshipAvailable && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      <Icon name="UserCheck" size={12} className="inline mr-1" />
                      Mentor Available
                    </span>
                  )}
                  {person?.isVerified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                </div>
              </div>

              {/* Professional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {person?.currentPosition}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Building" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {person?.company}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {person?.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Tag" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {person?.industry}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {person?.bio && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {person?.bio}
                  </p>
                </div>
              )}

              {/* Expertise Tags */}
              {person?.expertise && person?.expertise?.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {person?.expertise?.slice(0, 5)?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {person?.expertise?.length > 5 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{person?.expertise?.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{person?.connections} connections</span>
                  </div>
                  {person?.mentorshipAvailable && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={12} />
                      <span>{person?.menteesCount} mentees</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Active {person?.lastActive}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={() => handleConnect(person?.id)}
                  >
                    Connect
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => handleMessage(person?.id)}
                  >
                    Message
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewProfile(person?.id)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlumniList;