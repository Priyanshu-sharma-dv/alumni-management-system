import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "@/component/AppIcon";
import Button from "@/component/ui/Button";
import Input from "@/component/ui/Input";


const FeaturedEvents = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const events = [
    {
      id: 1,
      title: "Global Alumni Tech Summit 2024",
      date: "December 15, 2024",
      time: "9:00 AM - 6:00 PM EST",
      location: "Virtual & San Francisco",
      type: "Hybrid",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      description: "Join 500+ tech alumni for keynotes, networking, and career advancement sessions. Features industry leaders from Google, Apple, and emerging startups.",
      speakers: [
        { name: "Sarah Chen", title: "Senior Engineer at Google", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
        { name: "Marcus Rodriguez", title: "CEO at EcoTech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
      ],
      attendees: 342,
      maxAttendees: 500,
      price: "Free for Alumni",
      tags: ["Networking", "Career Growth", "Innovation"],
      status: "Open"
    },
    {
      id: 2,
      title: "Healthcare Alumni Mentorship Mixer",
      date: "January 20, 2025",
      time: "7:00 PM - 10:00 PM EST",
      location: "New York Medical Center",
      type: "In-Person",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      description: "Connect with healthcare professionals, share experiences, and build mentorship relationships in an intimate setting with industry experts.",
      speakers: [
        { name: "Dr. Priya Patel", title: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" }
      ],
      attendees: 89,
      maxAttendees: 150,
      price: "$25 Alumni / $15 Students",
      tags: ["Mentorship", "Healthcare", "Networking"],
      status: "Open"
    },
    {
      id: 3,
      title: "Entrepreneurship & Innovation Workshop",
      date: "February 8, 2025",
      time: "2:00 PM - 5:00 PM PST",
      location: "Silicon Valley Campus",
      type: "In-Person",
      category: "Business",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      description: "Learn from successful alumni entrepreneurs about building startups, securing funding, and scaling businesses in today's competitive market.",
      speakers: [
        { name: "Alex Thompson", title: "Founder at InnovateLab", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
        { name: "Lisa Wang", title: "VC Partner at Growth Capital", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
      ],
      attendees: 156,
      maxAttendees: 200,
      price: "$40 Alumni / $20 Students",
      tags: ["Entrepreneurship", "Funding", "Innovation"],
      status: "Filling Fast"
    }
  ];

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events?.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events?.length) % events?.length);
  };

  const currentEvent = events?.[currentEventIndex];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-success/10 text-success border-success/20';
      case 'Filling Fast':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Sold Out':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Virtual':
        return 'Monitor';
      case 'In-Person':
        return 'MapPin';
      case 'Hybrid':
        return 'Zap';
      default:
        return 'Calendar';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Icon name="Calendar" size={16} className="mr-2" />
            Upcoming Events
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connect, Learn &
            <span className="text-gradient-primary block">Grow Together</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join exclusive alumni events designed to foster meaningful connections, 
            advance your career, and strengthen our community bonds.
          </p>
        </div>

        {/* Featured Event Carousel */}
        <div className="relative mb-16">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2">
              {/* Event Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={currentEvent?.image}
                  alt={currentEvent?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(currentEvent?.status)}`}>
                    {currentEvent?.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
                    <Icon name={getTypeIcon(currentEvent?.type)} size={12} className="mr-1" />
                    {currentEvent?.type}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {currentEvent?.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevEvent}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {currentEventIndex + 1} of {events?.length}
                    </span>
                    <button
                      onClick={nextEvent}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {currentEvent?.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Calendar" size={16} className="mr-3" />
                    <span>{currentEvent?.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Clock" size={16} className="mr-3" />
                    <span>{currentEvent?.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="MapPin" size={16} className="mr-3" />
                    <span>{currentEvent?.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="DollarSign" size={16} className="mr-3" />
                    <span>{currentEvent?.price}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {currentEvent?.description}
                </p>

                {/* Speakers */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Featured Speakers</h4>
                  <div className="flex items-center space-x-4">
                    {currentEvent?.speakers?.map((speaker, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <img
                          src={speaker?.image}
                          alt={speaker?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{speaker?.name}</p>
                          <p className="text-xs text-muted-foreground">{speaker?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentEvent?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Attendance Info */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{currentEvent?.attendees} registered</span>
                    <span>{currentEvent?.maxAttendees} max capacity</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentEvent?.attendees / currentEvent?.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    iconName="Calendar"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Register Now
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events?.map((event, index) => (
            <div
              key={event?.id}
              className={`bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                index === currentEventIndex ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event?.image}
                  alt={event?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event?.status)}`}>
                    {event?.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    {event?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <Icon name={getTypeIcon(event?.type)} size={12} className="inline mr-1" />
                    {event?.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {event?.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} className="mr-2" />
                    <span>{event?.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} className="mr-2" />
                    <span className="truncate">{event?.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{event?.price}</span>
                  <span className="text-xs text-muted-foreground">
                    {event?.attendees}/{event?.maxAttendees} registered
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Don't miss out on upcoming events and networking opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button variant="default" iconName="Calendar" iconPosition="left">
                View All Events
              </Button>
            </Link>
            <Button variant="outline" iconName="Bell" iconPosition="left">
              Get Event Notifications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;