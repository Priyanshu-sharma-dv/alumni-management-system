import React, { useState } from 'react';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import Input from "@/Component/ui/Input";
import { alumniDashboardAPI } from '@/utils/api';


const UpcomingEvents = ({ events = [], loading = false, error = null, onRegister }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [registeringEvents, setRegisteringEvents] = useState(new Set());

  const handleRegister = async (eventId) => {
    try {
      setRegisteringEvents(prev => new Set(prev).add(eventId));
      await alumniDashboardAPI.registerForEvent(eventId);
      
      if (onRegister) {
        onRegister(eventId);
      }
      
      alert('Successfully registered for the event!');
    } catch (error) {
      console.error('Failed to register for event:', error);
      alert('Failed to register for event. Please try again.');
    } finally {
      setRegisteringEvents(prev => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };

  // 🔹 Format event date into Today / Tomorrow / In X days
  const formatEventDate = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;

    return eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: eventDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  // 🔹 Icons per event type
  const getEventTypeIcon = (type) => {
    const iconMap = {
      networking: 'Users',
      webinar: 'Video',
      workshop: 'BookOpen',
      social: 'Coffee',
      career: 'Briefcase',
      fundraising: 'Heart'
    };
    return iconMap?.[type] || 'Calendar';
  };

  // 🔹 Badge color per event type
  const getEventTypeColor = (type) => {
    const colorMap = {
      networking: 'bg-blue-100 text-blue-700',
      webinar: 'bg-purple-100 text-purple-700',
      workshop: 'bg-green-100 text-green-700',
      social: 'bg-orange-100 text-orange-700',
      career: 'bg-indigo-100 text-indigo-700',
      fundraising: 'bg-red-100 text-red-700'
    };
    return colorMap?.[type] || 'bg-gray-100 text-gray-700';
  };

  // 🔹 Expand/Collapse description
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ================== Render ==================
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
        <Button variant="ghost" size="sm">
          <Icon name="Calendar" size={16} />
          View Calendar
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-muted-foreground py-6">Loading events...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 py-6">⚠️ Failed to load events</p>
      )}

      {/* No Events */}
      {!loading && !error && events.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No upcoming events</p>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              {/* Event Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                {/* Title + Badge */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge with Icon */}
                  <span
                    className={`flex items-center text-xs px-2 py-1 rounded-full ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    <Icon
                      name={getEventTypeIcon(event.type)}
                      size={12}
                      className="mr-1"
                    />
                    {event.type}
                  </span>
                </div>

                {/* Description (expandable) */}
                <p
                  className={`text-sm text-muted-foreground mb-2 ${
                    expandedId === event.id ? '' : 'line-clamp-2'
                  }`}
                >
                  {event.description}
                </p>
                {event.description?.length > 80 && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => toggleExpand(event.id)}
                  >
                    {expandedId === event.id ? 'Show less' : 'Read more'}
                  </Button>
                )}

                {/* Footer: Attendees + Actions */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Users" size={14} />
                    <span>{event.attendees} attending</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {event.registered ? (
                      <Button variant="outline" size="sm" disabled>
                        <Icon name="Check" size={14} className="mr-1" />
                        Registered
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleRegister(event.id)}
                        loading={registeringEvents.has(event.id)}
                      >
                        Register
                      </Button>
                    )}

                    <Button variant="ghost" size="sm" aria-label="Share event">
                      <Icon name="Share" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      {events.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full">
            View All Events
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
