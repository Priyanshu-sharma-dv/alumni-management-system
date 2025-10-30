import React from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';

const NetworkingSuggestions = ({ suggestions }) => {
  const handleConnect = (userId) => {
    console.log(`Connecting with user ${userId}`);
  };

  const getConnectionReason = (reason) => {
    const reasonMap = {
      'same_company': 'Works at same company',
      'same_industry': 'Same industry',
      'same_location': 'Same location',
      'mutual_connections': 'Mutual connections',
      'same_graduation_year': 'Same graduation year',
      'similar_interests': 'Similar interests'
    };
    return reasonMap?.[reason] || reason;
  };

  const getReasonIcon = (reason) => {
    const iconMap = {
      'same_company': 'Building',
      'same_industry': 'Briefcase',
      'same_location': 'MapPin',
      'mutual_connections': 'Users',
      'same_graduation_year': 'GraduationCap',
      'similar_interests': 'Heart'
    };
    return iconMap?.[reason] || 'User';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Networking Suggestions</h2>
        <Button variant="ghost" size="sm">
          <Icon name="RefreshCw" size={16} />
        </Button>
      </div>
      {suggestions?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No suggestions available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions?.map((person) => (
            <div key={person?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={person?.avatar} 
                    alt={person?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{person?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {person?.title} at {person?.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Class of {person?.graduationYear} • {person?.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {person?.mutualConnections > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {person?.mutualConnections} mutual
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon 
                      name={getReasonIcon(person?.connectionReason)} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {getConnectionReason(person?.connectionReason)}
                    </span>
                  </div>
                  
                  {person?.recentActivity && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                      Recent: {person?.recentActivity}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleConnect(person?.id)}
                    >
                      <Icon name="UserPlus" size={14} className="mr-1" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" className="w-full">
          View More Suggestions
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NetworkingSuggestions;