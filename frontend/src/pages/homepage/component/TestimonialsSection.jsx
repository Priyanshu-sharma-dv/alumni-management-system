import React, { useState, useEffect } from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/component/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      title: "Product Manager at Microsoft",
      class: "Class of 2019",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      quote: "AlumniConnect transformed my career trajectory. Through the mentorship program, I connected with a senior PM who guided me through my transition from engineering to product management. The network I built here opened doors I never knew existed.",
      rating: 5,
      impact: {
        connections: 47,
        mentorships: 3,
        opportunities: 8
      },
      tags: ["Career Growth", "Mentorship", "Product Management"]
    },
    {
      id: 2,
      name: "David Kim",
      title: "Startup Founder & CEO",
      class: "Class of 2016",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      quote: "I found my co-founder, first investors, and key team members all through AlumniConnect. The platform didn't just help me network – it helped me build a company. Our startup has now raised $5M and employs 25 people, many of whom are fellow alumni.",
      rating: 5,
      impact: {
        connections: 89,
        mentorships: 5,
        opportunities: 15
      },
      tags: ["Entrepreneurship", "Funding", "Team Building"]
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      title: "Research Director at Johns Hopkins",
      class: "Class of 2014",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      quote: "The research collaboration opportunities through AlumniConnect have been incredible. I've co-authored papers with alumni from different fields, secured research grants through connections, and found brilliant minds to join my lab. It's a true academic powerhouse.",
      rating: 5,
      impact: {
        connections: 62,
        mentorships: 8,
        opportunities: 12
      },
      tags: ["Research", "Academia", "Collaboration"]
    },
    {
      id: 4,
      name: "Michael Thompson",
      title: "Investment Banking VP",
      class: "Class of 2017",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      quote: "The finance alumni network here is unmatched. From interview prep to deal sourcing, the community has been instrumental in my career progression. I've gone from analyst to VP in 5 years, largely thanks to the guidance and opportunities I found here.",
      rating: 5,
      impact: {
        connections: 73,
        mentorships: 4,
        opportunities: 11
      },
      tags: ["Finance", "Investment Banking", "Career Advancement"]
    },
    {
      id: 5,
      name: "Sofia Rodriguez",
      title: "UX Design Lead at Adobe",
      class: "Class of 2020",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      quote: "As a recent graduate, AlumniConnect gave me the confidence and connections I needed to land my dream job. The portfolio reviews, mock interviews, and honest career advice from experienced alumni made all the difference. I'm now leading a team of 12 designers.",
      rating: 5,
      impact: {
        connections: 34,
        mentorships: 2,
        opportunities: 6
      },
      tags: ["Design", "Recent Graduate", "Leadership"]
    }
  ];

  const impactCategories = [
    {
      key: 'connections',
      label: 'Professional Connections',
      icon: 'Users',
      color: 'text-primary'
    },
    {
      key: 'mentorships',
      label: 'Mentorship Relationships',
      icon: 'UserCheck',
      color: 'text-secondary'
    },
    {
      key: 'opportunities',
      label: 'Career Opportunities',
      icon: 'Briefcase',
      color: 'text-accent'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials?.length]);

  const currentTestimonial = testimonials?.[currentTestimonialIndex];

  const goToTestimonial = (index) => {
    setCurrentTestimonialIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-6">
            <Icon name="Heart" size={16} className="mr-2" />
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Stories from
            <span className="text-gradient-primary block">Real Alumni</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AlumniConnect has transformed careers, built lasting relationships, 
            and created opportunities for thousands of graduates worldwide.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                {/* Quote */}
                <div className="mb-8">
                  <Icon name="Quote" size={48} className="text-primary/20 mb-4" />
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                    "{currentTestimonial?.quote}"
                  </blockquote>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(currentTestimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                  ))}
                  <span className="ml-3 text-sm text-muted-foreground">
                    {currentTestimonial?.rating}.0 out of 5
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentTestimonial?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-6">
                  {impactCategories?.map((category) => (
                    <div key={category?.key} className="text-center">
                      <div className={`text-2xl font-bold ${category?.color} mb-1`}>
                        {currentTestimonial?.impact?.[category?.key]}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {category?.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <Image
                    src={currentTestimonial?.image}
                    alt={currentTestimonial?.name}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto lg:mx-0"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-4 border-card">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {currentTestimonial?.name}
                </h3>
                <p className="text-primary font-medium mb-1">
                  {currentTestimonial?.title}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {currentTestimonial?.class}
                </p>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  
                  <div className="flex space-x-2">
                    {testimonials?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentTestimonialIndex ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextTestimonial}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials?.slice(0, 4)?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              className={`bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                index === currentTestimonialIndex ? 'ring-2 ring-primary/20 shadow-lg' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial?.class}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                "{testimonial?.quote}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                  ))}
                </div>
                <span className="text-xs text-primary font-medium">
                  {testimonial?.impact?.connections} connections
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Join Thousands of Successful Alumni
            </h3>
            <p className="text-muted-foreground">
              Your success story could be next. Start building meaningful connections today.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '98%', label: 'Success Rate', icon: 'TrendingUp' },
              { number: '4.9/5', label: 'Average Rating', icon: 'Star' },
              { number: '25K+', label: 'Alumni Connected', icon: 'Users' },
              { number: '150+', label: 'Countries Reached', icon: 'Globe' }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.number}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;