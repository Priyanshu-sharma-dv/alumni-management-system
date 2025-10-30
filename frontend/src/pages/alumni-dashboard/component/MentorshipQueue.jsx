import React from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';
import { alumniDashboardAPI } from '@/utils/api';

const MentorshipQueue = ({ requests, onRequestUpdate }) => {
  const handleResponse = async (requestId, response) => {
    try {
      await alumniDashboardAPI.respondToMentorshipRequest(requestId, response);
      console.log(`Mentorship request ${requestId} ${response}ed`);
      
      // Call the parent component to update the requests list
      if (onRequestUpdate) {
        onRequestUpdate(requestId, response);
      }
    } catch (error) {
      console.error(`Failed to ${response} mentorship request:`, error);
      alert(`Failed to ${response} mentorship request. Please try again.`);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-foreground">Mentorship Requests</h2>
          {requests?.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {requests?.length}
            </span>
          )}
        </div>
        <Icon name="UserCheck" size={20} className="text-primary" />
      </div>
      {requests?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserCheck" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No pending mentorship requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests?.map((request) => (
            <div key={request?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={request?.student?.avatar} 
                    alt={request?.student?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{request?.student?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request?.student?.major} • {request?.student?.year}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.timestamp)?.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {request?.message}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Target" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Interested in: {request?.interests?.join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleResponse(request?.id, 'accept')}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResponse(request?.id, 'decline')}
                    >
                      Decline
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Profile
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
          View All Requests
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MentorshipQueue;