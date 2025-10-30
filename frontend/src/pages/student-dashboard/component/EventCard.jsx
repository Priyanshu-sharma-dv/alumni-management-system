import React from 'react';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';

const EventCard = ({ event, onRegister, onAddToCalendar }) => {
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'networking':
        return 'bg-blue-100 text-blue-700';
      case 'workshop':
        return 'bg-green-100 text-green-700';
      case 'career-fair':
        return 'bg-purple-100 text-purple-700';
      case 'webinar':
        return 'bg-orange-100 text-orange-700';
      case 'social':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'networking':
        return 'Users';
      case 'workshop':
        return 'Wrench';
      case 'career-fair':
        return 'Briefcase';
      case 'webinar':
        return 'Video';
      case 'social':
        return 'Coffee';
      default:
        return 'Calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getEventTypeColor(event?.type)}`}>
              <Icon name={getEventTypeIcon(event?.type)} size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{event?.title}</h3>
              <p className="text-muted-foreground text-sm capitalize">{event?.type?.replace('-', ' ')}</p>
            </div>
          </div>
          {event?.featured && (
            <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
              Featured
            </div>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event?.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(event?.date)} at {formatTime(event?.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name={event?.isVirtual ? "Monitor" : "MapPin"} size={14} />
            <span>{event?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={14} />
            <span>{event?.attendees} registered • {event?.capacity - event?.attendees} spots left</span>
          </div>
        </div>

        {event?.speakers && event?.speakers?.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground mb-2">Speakers:</div>
            <div className="flex items-center space-x-2">
              {event?.speakers?.slice(0, 3)?.map((speaker, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-secondary to-trust-builder rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{speaker}</span>
                </div>
              ))}
              {event?.speakers?.length > 3 && (
                <span className="text-sm text-muted-foreground">+{event?.speakers?.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {event?.tags && event?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {event?.price === 0 ? 'Free' : `$${event?.price}`}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onAddToCalendar(event?.id)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Icon name="CalendarPlus" size={16} />
            </button>
            <Button
              variant={event?.registered ? "outline" : "default"}
              size="sm"
              onClick={() => onRegister(event?.id)}
              iconName={event?.registered ? "Check" : "UserPlus"}
              iconPosition="right"
              disabled={event?.attendees >= event?.capacity}
            >
              {event?.registered ? "Registered" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;