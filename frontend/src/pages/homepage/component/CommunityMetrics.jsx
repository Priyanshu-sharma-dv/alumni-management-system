import React, { useState, useEffect } from 'react';
import Icon from '@/component/AppIcon';

const CommunityMetrics = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    alumni: 0,
    students: 0,
    connections: 0,
    events: 0,
    mentorships: 0,
    donations: 0
  });

  const finalCounts = {
    alumni: 25847,
    students: 8432,
    connections: 156789,
    events: 342,
    mentorships: 2156,
    donations: 1250000
  };

  const metrics = [
    {
      key: 'alumni',
      label: 'Active Alumni',
      icon: 'GraduationCap',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: '+',
      description: 'Professionals worldwide'
    },
    {
      key: 'students',
      label: 'Current Students',
      icon: 'BookOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      suffix: '+',
      description: 'Learning and growing'
    },
    {
      key: 'connections',
      label: 'Connections Made',
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      suffix: '+',
      description: 'Meaningful relationships'
    },
    {
      key: 'events',
      label: 'Events This Year',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10',
      suffix: '',
      description: 'Networking opportunities'
    },
    {
      key: 'mentorships',
      label: 'Active Mentorships',
      icon: 'UserCheck',
      color: 'text-trust-builder',
      bgColor: 'bg-trust-builder/10',
      suffix: '+',
      description: 'Guidance relationships'
    },
    {
      key: 'donations',
      label: 'Raised This Year',
      icon: 'DollarSign',
      color: 'text-conversion-accent',
      bgColor: 'bg-conversion-accent/10',
      prefix: '$',
      suffix: '',
      description: 'Supporting education'
    }
  ];

  const formatNumber = (num, key) => {
    if (key === 'donations') {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(0) + 'K';
    }
    return num?.toLocaleString();
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timers = Object.keys(finalCounts).map((key) => {
      const finalCount = finalCounts[key];
      const increment = finalCount / steps;
      let currentStep = 0;

      const timerId = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), finalCount);

        setAnimatedCounts((prev) => ({
          ...prev,
          [key]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timerId);
        }
      }, stepDuration);

      return timerId;
    });

    return () => {
      timers.forEach((t) => clearInterval(t));
    };
  }, );

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Real-Time Community Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Success Shared is
            <span className="text-gradient-primary block">Success Multiplied</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our thriving community continues to grow stronger every day. Here's the real-time impact we're making together across the globe.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={metric.key}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${metric.bgColor} ${metric.color} mb-6`}>
                <Icon name={metric.icon} size={28} />
              </div>

              <div className="mb-4">
                <div className={`text-4xl sm:text-5xl font-bold ${metric.color} mb-2`}>
                  {metric.prefix || ''}
                  {formatNumber(animatedCounts[metric.key], metric.key)}
                  {metric.suffix || ''}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{metric.label}</h3>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>

              {/* Progress indicator */}
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-1000 ${metric.bgColor?.replace('/10', '')}`}
                  style={{
                    width: `${(animatedCounts[metric.key] / finalCounts[metric.key]) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Live Community Activity</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
              Live Updates
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'UserPlus', text: 'Sarah M. joined the platform', time: '2 minutes ago', color: 'text-primary' },
              { icon: 'MessageSquare', text: 'New mentorship connection made', time: '5 minutes ago', color: 'text-secondary' },
              { icon: 'Calendar', text: 'Tech Alumni Meetup - 15 new registrations', time: '8 minutes ago', color: 'text-accent' },
              { icon: 'Heart', text: '$500 donated to scholarship fund', time: '12 minutes ago', color: 'text-conversion-accent' },
              { icon: 'Briefcase', text: 'New job opportunity posted', time: '15 minutes ago', color: 'text-trust-builder' },
              { icon: 'Award', text: 'Alumni spotlight: Michael R. promoted to VP', time: '18 minutes ago', color: 'text-success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                <Icon name={activity.icon} size={16} className={activity.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to become part of these growing numbers?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
              Join Our Community
            </button>
            <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200">
              View Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityMetrics;
