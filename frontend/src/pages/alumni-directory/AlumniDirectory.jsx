import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';
import Header from '@/Component/ui/Header';
import SearchFilters from './component/SearchFilters';
import AlumniCard from './component/AlumniCard';
import DirectoryStats from './component/DirectoryStats';
import ViewToggle from './component/ViewToggle';
import AlumniList from './component/AlumniList';
import MapView from './component/MapView';
import SavedSearches from './component/SavedSearches';
import { alumniAPI } from '@/utils/api';

const AlumniDirectory = () => {
  const [currentView, setCurrentView] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock alumni data
  const mockAlumni = [
    {
      id: 1,
      name: "Sarah Chen",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Senior Product Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      graduationYear: 2018,
      degree: "Computer Science",
      bio: "Passionate about building products that make a difference. Leading AI initiatives at Google with focus on user experience and accessibility.",
      expertise: ["Product Management", "AI/ML", "User Experience", "Strategy", "Leadership"],
      connections: 847,
      mentorshipAvailable: true,
      menteesCount: 12,
      isOnline: true,
      isVerified: true,
      joinedDate: "2019",
      lastActive: "2 hours ago",
      linkedinUrl: "https://linkedin.com/in/sarahchen",
      portfolioUrl: "https://sarahchen.dev",
      connectionStatus: "none"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Investment Director",
      company: "Goldman Sachs",
      location: "New York, NY",
      industry: "Finance",
      graduationYear: 2016,
      degree: "Finance & Economics",
      bio: "Experienced investment professional specializing in tech startups and growth equity. Mentor to aspiring finance professionals.",
      expertise: ["Investment Banking", "Private Equity", "Financial Analysis", "Startups", "Mentoring"],
      connections: 1243,
      mentorshipAvailable: true,
      menteesCount: 8,
      isOnline: false,
      isVerified: true,
      joinedDate: "2017",
      lastActive: "1 day ago",
      linkedinUrl: "https://linkedin.com/in/mrodriguez",
      connectionStatus: "connected"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Chief Medical Officer",
      company: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      industry: "Healthcare",
      graduationYear: 2012,
      degree: "Pre-Med & Biology",
      bio: "Leading healthcare innovation and patient care initiatives. Passionate about medical research and healthcare accessibility.",
      expertise: ["Healthcare Management", "Medical Research", "Patient Care", "Healthcare Policy", "Innovation"],
      connections: 692,
      mentorshipAvailable: true,
      menteesCount: 15,
      isOnline: true,
      isVerified: true,
      joinedDate: "2015",
      lastActive: "30 minutes ago",
      linkedinUrl: "https://linkedin.com/in/emilywatson",
      connectionStatus: "pending"
    },
    {
      id: 4,
      name: "James Park",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Founder & CEO",
      company: "TechStart Inc.",
      location: "Austin, TX",
      industry: "Technology",
      graduationYear: 2019,
      degree: "Business Administration",
      bio: "Serial entrepreneur with 3 successful exits. Building the next generation of SaaS tools for small businesses.",
      expertise: ["Entrepreneurship", "SaaS", "Business Strategy", "Fundraising", "Team Building"],
      connections: 1567,
      mentorshipAvailable: false,
      menteesCount: 0,
      isOnline: false,
      isVerified: true,
      joinedDate: "2020",
      lastActive: "3 days ago",
      linkedinUrl: "https://linkedin.com/in/jamespark",
      portfolioUrl: "https://jamespark.co",
      connectionStatus: "none"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Creative Director",
      company: "Ogilvy",
      location: "Chicago, IL",
      industry: "Marketing",
      graduationYear: 2017,
      degree: "Marketing & Design",
      bio: "Award-winning creative director with expertise in brand strategy and digital marketing. Helping brands tell their stories.",
      expertise: ["Creative Direction", "Brand Strategy", "Digital Marketing", "Design Thinking", "Campaign Management"],
      connections: 934,
      mentorshipAvailable: true,
      menteesCount: 6,
      isOnline: true,
      isVerified: false,
      joinedDate: "2018",
      lastActive: "1 hour ago",
      linkedinUrl: "https://linkedin.com/in/lisathompson",
      portfolioUrl: "https://lisathompson.design",
      connectionStatus: "none"
    },
    {
      id: 6,
      name: "David Kim",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      currentPosition: "Senior Software Engineer",
      company: "Microsoft",
      location: "Seattle, WA",
      industry: "Technology",
      graduationYear: 2020,
      degree: "Computer Engineering",
      bio: "Full-stack developer passionate about cloud computing and AI. Contributing to open-source projects and mentoring junior developers.",
      expertise: ["Software Engineering", "Cloud Computing", "AI/ML", "Open Source", "Mentoring"],
      connections: 456,
      mentorshipAvailable: true,
      menteesCount: 4,
      isOnline: false,
      isVerified: true,
      joinedDate: "2021",
      lastActive: "5 hours ago",
      linkedinUrl: "https://linkedin.com/in/davidkim",
      portfolioUrl: "https://github.com/davidkim",
      connectionStatus: "none"
    }
  ];

  // Mock directory stats
  const mockStats = {
    totalAlumni: 12847,
    availableMentors: 3421,
    industries: 47,
    countries: 23,
    activeThisMonth: 8934,
    newConnections: 1247
  };

  // Mock saved searches
  const mockSavedSearches = [
    {
      id: 1,
      name: "Tech Professionals in SF",
      filters: {
        industry: "technology",
        location: "san-francisco",
        mentorshipAvailable: "available"
      },
      resultCount: 234,
      savedDate: "2 weeks ago",
      usageCount: 12,
      isDefault: true
    },
    {
      id: 2,
      name: "Recent Graduates",
      filters: {
        graduationYear: "2020-2024",
        mentorshipAvailable: "available"
      },
      resultCount: 567,
      savedDate: "1 month ago",
      usageCount: 8,
      isDefault: false
    },
    {
      id: 3,
      name: "Healthcare Leaders",
      filters: {
        industry: "healthcare",
        expertise: "leadership"
      },
      resultCount: 89,
      savedDate: "3 weeks ago",
      usageCount: 5,
      isDefault: false
    }
  ];

  // ✅ Fixed useEffect
  
useEffect(() => {
  // try to fetch real alumni from backend; fallback to mock data if error
  async function load() {
    setIsLoading(true);
    try {
      const data = await alumniAPI.getAll();
      const normalized = (data || []).map(u => ({
        ...u,
        profileImage: u.profileImage && !/^https?:/i.test(u.profileImage)
          ? `/uploads/${u.profileImage}`
          : u.profileImage
      }));
      setFilteredAlumni(normalized);
    } catch (err) {
      console.error('Failed to load alumni', err);
      // keep using mock data if backend not available
      setFilteredAlumni(mockAlumni);
    } finally {
      setIsLoading(false);
    }
  }
  load();
}, []);


  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = mockAlumni;
      
      if (newFilters?.searchQuery) {
        const query = newFilters?.searchQuery?.toLowerCase();
        filtered = filtered?.filter(alumni => 
          alumni?.name?.toLowerCase()?.includes(query) ||
          alumni?.company?.toLowerCase()?.includes(query) ||
          alumni?.currentPosition?.toLowerCase()?.includes(query) ||
          alumni?.expertise?.some(skill => skill?.toLowerCase()?.includes(query))
        );
      }
      
      if (newFilters?.industry) {
        filtered = filtered?.filter(alumni => 
          alumni?.industry?.toLowerCase() === newFilters?.industry
        );
      }
      
      if (newFilters?.location) {
        filtered = filtered?.filter(alumni => 
          alumni?.location?.toLowerCase()?.includes(newFilters?.location?.replace('-', ' '))
        );
      }
      
      if (newFilters?.mentorshipAvailable === 'available') {
        filtered = filtered?.filter(alumni => alumni?.mentorshipAvailable);
      }
      
      if (newFilters?.company) {
        const company = newFilters?.company?.toLowerCase();
        filtered = filtered?.filter(alumni => 
          alumni?.company?.toLowerCase()?.includes(company)
        );
      }
      
      setFilteredAlumni(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleClearFilters = () => {
    setFilters({});
    setFilteredAlumni(mockAlumni);
  };

  const handleConnect = (alumniId) => {
    console.log('Connecting to alumni:', alumniId);
    setFilteredAlumni(prev => 
      prev?.map(alumni => 
        alumni?.id === alumniId 
          ? { ...alumni, connectionStatus: 'pending' }
          : alumni
      )
    );
  };

  const handleMessage = (alumniId) => {
    console.log('Messaging alumni:', alumniId);
  };

  const handleViewProfile = (alumniId) => {
    console.log('Viewing profile:', alumniId);
  };

  const handleSaveCurrentSearch = (searchName) => {
    console.log('Saving search:', searchName, filters);
  };

  const handleLoadSearch = (search) => {
    console.log('Loading search:', search);
    setFilters(search?.filters);
    handleFiltersChange(search?.filters);
  };

  const handleDeleteSearch = (searchId) => {
    console.log('Deleting search:', searchId);
  };

  const renderAlumniView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading alumni...</p>
          </div>
        </div>
      );
    }

    if (filteredAlumni?.length === 0) {
      return (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Alumni Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search filters to find more alumni
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      );
    }

    switch (currentView) {
      case 'list':
        return (
          <AlumniList
            alumni={filteredAlumni}
            onConnect={handleConnect}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          />
        );
      case 'map':
        return (
          <MapView
            alumni={filteredAlumni}
            onConnect={handleConnect}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni?.map((alumni) => (
              <AlumniCard
                key={alumni?.id}
                alumni={alumni}
                onConnect={handleConnect}
                onMessage={handleMessage}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Alumni Directory
              </h1>
              <p className="text-muted-foreground">
                Connect with fellow alumni, find mentors, and expand your professional network
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Directory
              </Button>
              <Button variant="default" iconName="UserPlus" iconPosition="left">
                Invite Alumni
              </Button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/alumni-dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Alumni Directory</span>
          </nav>
        </div>

        {/* Directory Stats */}
        <div className="mb-8">
          <DirectoryStats stats={mockStats} />
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          />
        </div>

        {/* Saved Searches */}
        <div className="mb-8">
          <SavedSearches
            savedSearches={mockSavedSearches}
            onLoadSearch={handleLoadSearch}
            onDeleteSearch={handleDeleteSearch}
            onSaveCurrentSearch={handleSaveCurrentSearch}
          />
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <ViewToggle
            currentView={currentView}
            onViewChange={setCurrentView}
            resultCount={filteredAlumni?.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Alumni Results */}
        <div className="mb-8">
          {renderAlumniView()}
        </div>

        {/* Load More */}
        {filteredAlumni?.length > 0 && !isLoading && (
          <div className="text-center">
            <Button variant="outline" size="lg" iconName="ChevronDown" iconPosition="right">
              Load More Alumni
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Showing {filteredAlumni?.length} of {mockStats?.totalAlumni} alumni
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
