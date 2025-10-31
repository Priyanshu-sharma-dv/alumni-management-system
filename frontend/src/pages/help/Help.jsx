import React, { useState } from 'react';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Icon from '@/Component/AppIcon';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'Play' },
    { id: 'account', name: 'Account & Profile', icon: 'User' },
    { id: 'networking', name: 'Networking', icon: 'Users' },
    { id: 'mentorship', name: 'Mentorship', icon: 'UserCheck' },
    { id: 'events', name: 'Events', icon: 'Calendar' },
    { id: 'resources', name: 'Resources', icon: 'BookOpen' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: 'AlertCircle' }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Sign Up" in the top right corner and fill out the registration form with your alumni information.'
      },
      {
        question: 'What types of accounts are available?',
        answer: 'We offer accounts for alumni, current students, and administrators. Each has different features and access levels.'
      },
      {
        question: 'How do I verify my alumni status?',
        answer: 'Upload your diploma or contact your alumni office for verification. We\'ll review and approve your account within 24-48 hours.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile?',
        answer: 'Go to your profile page and click "Edit Profile". You can update your photo, bio, skills, and contact information.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Visit Settings > Security and click "Change Password". You\'ll receive a confirmation email.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact our support team through the help form below. Account deletion is permanent and cannot be undone.'
      }
    ],
    'networking': [
      {
        question: 'How do I find other alumni?',
        answer: 'Use the Alumni Directory to search by location, industry, graduation year, or skills. You can also join networking events.'
      },
      {
        question: 'How do I send connection requests?',
        answer: 'Visit an alumni\'s profile and click "Connect". They\'ll receive a notification and can accept or decline your request.'
      },
      {
        question: 'What are networking events?',
        answer: 'These are virtual or in-person events where alumni gather to share experiences, discuss career topics, and build relationships.'
      }
    ],
    'mentorship': [
      {
        question: 'How do I find a mentor?',
        answer: 'Browse the Mentorship section and filter by industry or skills. You can also request mentorship from specific alumni.'
      },
      {
        question: 'How do I become a mentor?',
        answer: 'Go to Mentorship > Create Mentorship and fill out your expertise areas and availability. Students can then connect with you.'
      },
      {
        question: 'What should I expect from a mentorship?',
        answer: 'Mentorship relationships vary, but typically include career advice, skill development guidance, and networking opportunities.'
      }
    ],
    'events': [
      {
        question: 'How do I register for events?',
        answer: 'Visit the Events page and click "Register" on any event you\'re interested in. You\'ll receive confirmation and reminders.'
      },
      {
        question: 'Can I create my own events?',
        answer: 'Alumni and administrators can create events. Go to Events > Create Event and fill out the event details.'
      },
      {
        question: 'How do I cancel my event registration?',
        answer: 'Visit your profile or the event details page and click "Cancel Registration". Some events may have cancellation fees.'
      }
    ],
    'resources': [
      {
        question: 'What resources are available?',
        answer: 'We offer career guides, resume templates, networking tips, alumni success stories, and industry-specific resources.'
      },
      {
        question: 'How do I download resources?',
        answer: 'Click on any resource and select "Download". Some resources require account verification.'
      },
      {
        question: 'Can I contribute resources?',
        answer: 'Yes! Alumni can submit resources through the Resources > Add Resource page. Our team reviews submissions for quality.'
      }
    ],
    'troubleshooting': [
      {
        question: 'I forgot my password',
        answer: 'Click "Forgot Password" on the login page and enter your email. You\'ll receive reset instructions.'
      },
      {
        question: 'The website isn\'t loading properly',
        answer: 'Try clearing your browser cache and cookies, or try a different browser. If issues persist, contact support.'
      },
      {
        question: 'I\'m having trouble uploading files',
        answer: 'Check that your files are under the size limit (10MB) and in supported formats (PDF, DOC, JPG, PNG).'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions and get the help you need.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={category.icon} size={16} />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'No results found for your search.' : 'No FAQs available for this category.'}
                  </p>
                  <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div className="mt-12 bg-card border border-border rounded-lg p-6">
              <div className="text-center">
                <h3 className="font-semibold text-foreground text-lg mb-2">Still need help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="default" iconName="Mail">
                    Contact Support
                  </Button>
                  <Button variant="outline" iconName="MessageCircle">
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
