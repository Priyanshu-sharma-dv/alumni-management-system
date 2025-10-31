import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Icon from '@/Component/AppIcon';
import { resourcesAPI } from '@/utils/api';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'Grid3X3' },
    { id: 'career', name: 'Career Development', icon: 'Briefcase' },
    { id: 'networking', name: 'Networking', icon: 'Users' },
    { id: 'skills', name: 'Skill Building', icon: 'BookOpen' },
    { id: 'alumni', name: 'Alumni Stories', icon: 'Award' },
    { id: 'tools', name: 'Tools & Templates', icon: 'Wrench' }
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Mock data for now since backend might not have resources endpoint
        const mockResources = [
          {
            id: 1,
            title: 'Resume Writing Guide',
            description: 'Complete guide to crafting an effective resume that stands out to employers.',
            category: 'career',
            type: 'download',
            icon: 'FileText',
            readTime: '15 min read',
            downloads: 245,
            tags: ['Resume', 'Career', 'Job Search']
          },
          {
            id: 2,
            title: 'Networking Best Practices',
            description: 'Learn how to build and maintain professional relationships in your industry.',
            category: 'networking',
            type: 'article',
            icon: 'Users',
            readTime: '10 min read',
            downloads: 189,
            tags: ['Networking', 'Professional Development']
          },
          {
            id: 3,
            title: 'JavaScript Fundamentals',
            description: 'Master the basics of JavaScript programming with practical examples.',
            category: 'skills',
            type: 'download',
            icon: 'Code',
            readTime: '30 min read',
            downloads: 312,
            tags: ['JavaScript', 'Programming', 'Web Development']
          },
          {
            id: 4,
            title: 'Alumni Success Story: Tech Entrepreneur',
            description: 'How one alumnus built a successful startup from scratch.',
            category: 'alumni',
            type: 'article',
            icon: 'Award',
            readTime: '8 min read',
            downloads: 156,
            tags: ['Entrepreneurship', 'Success Story', 'Startup']
          },
          {
            id: 5,
            title: 'LinkedIn Optimization Template',
            description: 'Template and guide for optimizing your LinkedIn profile.',
            category: 'tools',
            type: 'download',
            icon: 'Wrench',
            readTime: '12 min read',
            downloads: 278,
            tags: ['LinkedIn', 'Social Media', 'Professional Branding']
          }
        ];
        setResources(mockResources);
      } catch (err) {
        setError('Failed to load resources');
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  const handleDownload = async (resourceId) => {
    try {
      await resourcesAPI.download(resourceId);
      alert('Resource downloaded successfully!');
    } catch (err) {
      console.error('Failed to download resource:', err);
      alert('Failed to download resource. Please try again.');
    }
  };

  const handleBookmark = async (resourceId) => {
    try {
      await resourcesAPI.bookmark(resourceId);
      alert('Resource bookmarked successfully!');
    } catch (err) {
      console.error('Failed to bookmark resource:', err);
      alert('Failed to bookmark resource. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resources</h1>
            <p className="text-muted-foreground mt-2">
              Access career resources, networking guides, and alumni success stories.
            </p>
          </div>
          <Link to="/resources/create">
            <Button variant="default" iconName="Plus">
              Add Resource
            </Button>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertCircle" size={24} className="text-red-600" />
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {/* Resources Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  {activeCategory === 'all' ? 'No resources available' : `No ${activeCategory} resources found`}
                </p>
                <Link to="/resources/create">
                  <Button variant="outline">Add the First Resource</Button>
                </Link>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={resource.icon || 'FileText'} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm capitalize">{resource.category}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{resource.readTime || '5 min read'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Download" size={14} />
                      <span>{resource.downloads || 0} downloads</span>
                    </div>
                  </div>

                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {resource.type === 'download' ? 'Downloadable' : 'Article'}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBookmark(resource.id)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                      >
                        <Icon name="Bookmark" size={16} />
                      </button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownload(resource.id)}
                      >
                        {resource.type === 'download' ? 'Download' : 'Read'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer Actions */}
        {!loading && !error && filteredResources.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mentorship">
                <Button variant="outline" iconName="UserCheck">
                  Find a Mentor
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" iconName="Calendar">
                  Join Events
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Resources;
