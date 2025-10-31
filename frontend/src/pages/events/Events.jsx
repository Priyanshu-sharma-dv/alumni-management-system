import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Icon from '@/Component/AppIcon';
import { eventsAPI } from '@/utils/api';
import UpcomingEvents from '@/pages/alumni-dashboard/component/UpcomingEvents';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventsAPI.getAll();
        setEvents(eventsData || []);
      } catch (err) {
        setError('Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventRegistration = (eventId) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, registered: true, attendees: event.attendees + 1 }
        : event
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground mt-2">
              Discover and register for upcoming alumni events and networking opportunities.
            </p>
          </div>
          <Link to="/events/create">
            <Button variant="default" iconName="Plus">
              Create Event
            </Button>
          </Link>
        </div>

        {/* Events Section */}
        <UpcomingEvents
          events={events}
          loading={loading}
          error={error}
          onRegister={handleEventRegistration}
        />

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/alumni-directory">
              <Button variant="outline" iconName="Users">
                Browse Alumni Directory
              </Button>
            </Link>
            <Link to="/mentorships/create">
              <Button variant="outline" iconName="UserCheck">
                Start a Mentorship
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
