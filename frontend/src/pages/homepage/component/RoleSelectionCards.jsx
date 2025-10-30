import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';

const RoleSelectionCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const roles = [
    {
      id: 'alumni',
      title: 'Alumni',
      subtitle: 'Reconnect & Give Back',
      description: 'Network with fellow graduates, mentor students, and advance your career through meaningful connections.',
      icon: 'GraduationCap',
      color: 'primary',
      route: '/alumni-dashboard',
      features: [
        'Professional networking directory',
        'Mentorship opportunities',
        'Exclusive alumni events',
        'Career advancement resources'
      ],
      stats: {
        count: '15,000+',
        label: 'Active Alumni'
      },
      preview: {
        title: 'Alumni Dashboard Preview',
        items: [
          { icon: 'Users', text: 'Network connections: 247' },
          { icon: 'Calendar', text: 'Upcoming reunion: Dec 15' },
          { icon: 'MessageSquare', text: '3 mentorship requests' },
          { icon: 'TrendingUp', text: 'Profile views: +15% this month' }
        ]
      }
    },
    {
      id: 'student',
      title: 'Current Students',
      subtitle: 'Learn & Connect',
      description: 'Access mentorship, internship opportunities, and career guidance from successful alumni.',
      icon: 'BookOpen',
      color: 'secondary',
      route: '/student-dashboard',
      features: [
        'Mentor matching system',
        'Internship & job board',
        'Career development workshops',
        'Alumni networking events'
      ],
      stats: {
        count: '8,500+',
        label: 'Active Students'
      },
      preview: {
        title: 'Student Dashboard Preview',
        items: [
          { icon: 'UserCheck', text: 'Matched with mentor: Sarah Chen' },
          { icon: 'Briefcase', text: '12 new internship opportunities' },
          { icon: 'Calendar', text: 'Next workshop: Career Fair Prep' },
          { icon: 'Award', text: 'Completed: LinkedIn Optimization' }
        ]
      }
    },
    {
      id: 'admin',
      title: 'Administrators',
      subtitle: 'Manage & Analyze',
      description: 'Oversee community engagement, manage events, and track institutional growth metrics.',
      icon: 'Shield',
      color: 'accent',
      route: '/admin-dashboard',
      features: [
        'Engagement analytics dashboard',
        'Event management system',
        'Communication tools',
        'Fundraising campaign tracking'
      ],
      stats: {
        count: '150+',
        label: 'Staff Members'
      },
      preview: {
        title: 'Admin Dashboard Preview',
        items: [
          { icon: 'BarChart3', text: 'Monthly engagement: +23%' },
          { icon: 'Calendar', text: '5 events this month' },
          { icon: 'DollarSign', text: 'Fundraising goal: 78% complete' },
          { icon: 'Mail', text: 'Campaign reach: 12,500 alumni' }
        ]
      }
    }
  ];

  const getColorClasses = (color, isHovered) => {
    const colors = {
      primary: {
        bg: isHovered ? 'bg-primary/10' : 'bg-primary/5',
        border: isHovered ? 'border-primary/30' : 'border-primary/20',
        icon: 'text-primary',
        button: 'btn-primary'
      },
      secondary: {
        bg: isHovered ? 'bg-secondary/10' : 'bg-secondary/5',
        border: isHovered ? 'border-secondary/30' : 'border-secondary/20',
        icon: 'text-secondary',
        button: 'btn-secondary'
      },
      accent: {
        bg: isHovered ? 'bg-accent/10' : 'bg-accent/5',
        border: isHovered ? 'border-accent/30' : 'border-accent/20',
        icon: 'text-accent',
        button: 'bg-accent text-accent-foreground hover:bg-accent/90'
      }
    };
    return colors?.[color];
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Path to
            <span className="text-gradient-primary block">Success</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're an accomplished alumni, ambitious student, or dedicated administrator, 
            AlumniConnect Pro has the tools and community to help you thrive.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {roles?.map((role) => {
            const isHovered = hoveredCard === role?.id;
            const colorClasses = getColorClasses(role?.color, isHovered);
            
            return (
              <div
                key={role?.id}
                className={`relative bg-card border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${colorClasses?.bg} ${colorClasses?.border}`}
                onMouseEnter={() => setHoveredCard(role?.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorClasses?.bg} ${colorClasses?.icon} mb-4`}>
                    <Icon name={role?.icon} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{role?.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">{role?.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{role?.description}</p>
                </div>
                {/* Stats */}
                <div className="text-center mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className={`text-2xl font-bold ${colorClasses?.icon}`}>{role?.stats?.count}</div>
                  <div className="text-sm text-muted-foreground">{role?.stats?.label}</div>
                </div>
                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {role?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className={`mr-3 ${colorClasses?.icon}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {/* CTA Button */}
                <Link to={role?.route} className="block">
                  <Button 
                    variant={role?.color === 'accent' ? 'default' : role?.color === 'primary' ? 'default' : 'secondary'}
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={role?.color === 'accent' ? colorClasses?.button : ''}
                  >
                    Explore {role?.title} Portal
                  </Button>
                </Link>
                {/* Hover Preview */}
                {isHovered && (
                  <div className="absolute inset-0 bg-card border border-border rounded-2xl p-6 shadow-2xl z-10 transform scale-105 transition-all duration-300">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground">{role?.preview?.title}</h4>
                        <Icon name="X" size={16} className="text-muted-foreground cursor-pointer" />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        {role?.preview?.items?.map((item, index) => (
                          <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                            <Icon name={item?.icon} size={16} className={`mr-3 ${colorClasses?.icon}`} />
                            <span className="text-sm text-muted-foreground">{item?.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link to={role?.route} className="mt-4">
                        <Button 
                          variant="outline" 
                          fullWidth 
                          iconName="ExternalLink" 
                          iconPosition="right"
                          size="sm"
                        >
                          View Full Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which path is right for you? Take our quick assessment.
          </p>
          <Button variant="outline" iconName="HelpCircle" iconPosition="left">
            Find My Perfect Role
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoleSelectionCards;