import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Icon from '@/Component/AppIcon';
import { mentorshipAPI } from '@/utils/api';

const Mentorships = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const mentorshipsData = await mentorshipAPI.getAll();
        setMentorships(mentorshipsData || []);
      } catch (err) {
        setError('Failed to load mentorships');
        console.error('Error fetching mentorships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  const handleConnect = (mentorshipId) => {
    // Handle mentorship connection
    console.log('Connecting to mentorship:', mentorshipId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mentorship Program</h1>
            <p className="text-muted-foreground mt-2">
              Connect with experienced alumni mentors and accelerate your career growth.
            </p>
          </div>
          <Link to="/mentorships/create">
            <Button variant="default" iconName="Plus">
              Create Mentorship
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading mentorship opportunities...</p>
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

        {/* Mentorships Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorships.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserCheck" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">No mentorship opportunities available</p>
                <Link to="/mentorships/create">
                  <Button variant="outline">Create the First Mentorship</Button>
                </Link>
              </div>
            ) : (
              mentorships.map((mentorship) => (
                <div
                  key={mentorship.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="UserCheck" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">{mentorship.mentorName}</h3>
                      <p className="text-muted-foreground text-sm">{mentorship.title}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {mentorship.bio}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} />
                      <span>{mentorship.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span>{mentorship.capacity} spots available</span>
                    </div>
                  </div>

                  {mentorship.expertise && mentorship.expertise.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-foreground mb-2">Expertise:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentorship.expertise.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {mentorship.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                            +{mentorship.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {mentorship.isRemote ? 'Remote' : 'In-person'}
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleConnect(mentorship.id)}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer Actions */}
        {!loading && !error && mentorships.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Can't find the right mentor?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/alumni-directory">
                <Button variant="outline" iconName="Users">
                  Browse Alumni Directory
                </Button>
              </Link>
              <Link to="/mentorships/create">
                <Button variant="outline" iconName="UserCheck">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Mentorships;
