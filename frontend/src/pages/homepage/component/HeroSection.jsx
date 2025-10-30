import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/Component/AppIcon";
import Image from "@/Component/AppImage";
import Button from "@/Component/ui/Button";
// Move this OUTSIDE the component to prevent re-creation every render
const successStories = [
  {
    id: 1,
    name: "Sarah Chen",
    class: "Class of 2018",
    title: "Senior Software Engineer at Google",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    quote:
      "AlumniConnect helped me find my mentor who guided me through my career transition into tech. Now I'm paying it forward by mentoring current students.",
    achievement: "Promoted 3 times in 4 years",
    impact: "Mentored 15+ students",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    class: "Class of 2015",
    title: "Founder & CEO at EcoTech Solutions",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    quote:
      "The network I built through AlumniConnect became the foundation of my startup. Three of my co-founders are fellow alumni I connected with here.",
    achievement: "Raised $2.5M Series A",
    impact: "Created 50+ jobs",
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    class: "Class of 2012",
    title: "Chief Medical Officer at HealthFirst",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    quote:
      "Through AlumniConnect's mentorship program, I've been able to guide young women entering medicine while building lasting professional relationships.",
    achievement: "Published 25+ research papers",
    impact: "Mentored 30+ medical students",
  },
];

const HeroSection = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentStory = successStories[currentStoryIndex];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Lifelong Learning, Lasting Connections
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Network is Your
              <span className="text-gradient-primary block">Net Worth</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
              Join thousands of alumni building careers, sharing opportunities,
              and creating lasting impact. Connect with mentors, find your next
              opportunity, or give back to the next generation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg px-8 py-4"
              >
                <Link to="/login-portal" className="flex items-center">
                  Get Started Today
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                Watch Success Stories
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Users" size={16} className="mr-2 text-primary" />
                <span>25,000+ Alumni</span>
              </div>
              <div className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-2 text-primary" />
                <span>150+ Countries</span>
              </div>
              <div className="flex items-center">
                <Icon name="Briefcase" size={16} className="mr-2 text-primary" />
                <span>500+ Companies</span>
              </div>
            </div>
          </div>

          {/* Right Content - Success Story Card */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl border border-border p-8 transform hover:scale-105 transition-transform duration-300">
              {/* Story Navigation */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStoryIndex(index)}
                      aria-label={`View success story ${index + 1}`}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentStoryIndex
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Success Story {currentStoryIndex + 1} of{" "}
                  {successStories.length}
                </div>
              </div>

              {/* Story Content */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Image
                    src={currentStory?.image}
                    alt={currentStory?.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {currentStory?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {currentStory?.class}
                </p>
                <p className="text-primary font-medium mb-4">
                  {currentStory?.title}
                </p>

                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{currentStory?.quote}"
                </blockquote>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary">
                      {currentStory?.achievement}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Career Growth
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-secondary">
                      {currentStory?.impact}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Community Impact
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
