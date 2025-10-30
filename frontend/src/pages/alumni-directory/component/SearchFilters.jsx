import React, { useState } from 'react';
import Icon from '@/Component/AppIcon';
import Input from '@/Component/ui/Input';
import Select from '@/Component/ui/Select';
import Button from '@/Component/ui/Button';

const SearchFilters = ({ onFiltersChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    industry: '',
    location: '',
    graduationYear: '',
    expertise: '',
    mentorshipAvailable: '',
    company: ''
  });

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'law', label: 'Legal Services' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'atlanta', label: 'Atlanta, GA' },
    { value: 'remote', label: 'Remote' },
    { value: 'international', label: 'International' }
  ];

  const graduationYearOptions = [
    { value: '', label: 'All Years' },
    { value: '2020-2024', label: '2020-2024' },
    { value: '2015-2019', label: '2015-2019' },
    { value: '2010-2014', label: '2010-2014' },
    { value: '2005-2009', label: '2005-2009' },
    { value: '2000-2004', label: '2000-2004' },
    { value: 'before-2000', label: 'Before 2000' }
  ];

  const expertiseOptions = [
    { value: '', label: 'All Expertise' },
    { value: 'leadership', label: 'Leadership & Management' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'product-management', label: 'Product Management' },
    { value: 'sales', label: 'Sales & Business Development' },
    { value: 'design', label: 'Design & UX' },
    { value: 'research', label: 'Research & Development' },
    { value: 'operations', label: 'Operations' },
    { value: 'strategy', label: 'Strategy & Planning' }
  ];

  const mentorshipOptions = [
    { value: '', label: 'All Alumni' },
    { value: 'available', label: 'Available for Mentorship' },
    { value: 'not-available', label: 'Not Available' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      searchQuery: '',
      industry: '',
      location: '',
      graduationYear: '',
      expertise: '',
      mentorshipAvailable: '',
      company: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Search Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
          >
            {isCollapsed ? 'Show' : 'Hide'}
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Search Query */}
          <div>
            <Input
              type="search"
              label="Search Alumni"
              placeholder="Search by name, company, or keywords..."
              value={filters?.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Industry"
              options={industryOptions}
              value={filters?.industry}
              onChange={(value) => handleFilterChange('industry', value)}
              searchable
            />

            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              searchable
            />

            <Select
              label="Graduation Year"
              options={graduationYearOptions}
              value={filters?.graduationYear}
              onChange={(value) => handleFilterChange('graduationYear', value)}
            />

            <Select
              label="Expertise"
              options={expertiseOptions}
              value={filters?.expertise}
              onChange={(value) => handleFilterChange('expertise', value)}
              searchable
            />

            <Select
              label="Mentorship"
              options={mentorshipOptions}
              value={filters?.mentorshipAvailable}
              onChange={(value) => handleFilterChange('mentorshipAvailable', value)}
            />

            <Input
              type="text"
              label="Company"
              placeholder="Search by company..."
              value={filters?.company}
              onChange={(e) => handleFilterChange('company', e?.target?.value)}
            />
          </div>

          {/* Advanced Search Options */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" iconName="MapPin">
                Map View
              </Button>
              <Button variant="outline" size="sm" iconName="Save">
                Save Search
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Export Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;