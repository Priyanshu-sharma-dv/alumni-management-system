import React, { useState } from 'react';

import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';

const UserSegmentationTool = ({ onCreateSegment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    location: '',
    industry: '',
    engagementLevel: '',
    donationHistory: ''
  });

  const predefinedSegments = [
    {
      id: 1,
      name: "High Engagement Alumni",
      description: "Alumni with 80%+ engagement rate in last 6 months",
      count: 1247,
      criteria: "Engagement > 80%, Last Active < 30 days"
    },
    {
      id: 2,
      name: "Recent Graduates",
      description: "Alumni graduated within last 3 years",
      count: 892,
      criteria: "Graduation Year >= 2021"
    },
    {
      id: 3,
      name: "Major Donors",
      description: "Alumni with lifetime donations > $1000",
      count: 156,
      criteria: "Total Donations > $1000"
    },
    {
      id: 4,
      name: "Tech Industry",
      description: "Alumni working in technology sector",
      count: 2341,
      criteria: "Industry = Technology"
    }
  ];

  const handleCreateSegment = () => {
    if (segmentName?.trim()) {
      onCreateSegment({
        name: segmentName,
        filters: filters,
        timestamp: new Date()?.toISOString()
      });
      setSegmentName('');
      setFilters({
        graduationYear: '',
        location: '',
        industry: '',
        engagementLevel: '',
        donationHistory: ''
      });
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Segmentation</h3>
          <p className="text-sm text-muted-foreground">Create targeted user segments for campaigns</p>
        </div>
        <Button 
          variant="outline" 
          iconName="Plus" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Create Segment
        </Button>
      </div>
      {/* Create New Segment */}
      {isExpanded && (
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="space-y-4">
            <Input
              label="Segment Name"
              type="text"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e?.target?.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Graduation Year"
                type="text"
                placeholder="e.g., 2020-2023"
                value={filters?.graduationYear}
                onChange={(e) => setFilters({...filters, graduationYear: e?.target?.value})}
              />
              <Input
                label="Location"
                type="text"
                placeholder="e.g., New York, CA"
                value={filters?.location}
                onChange={(e) => setFilters({...filters, location: e?.target?.value})}
              />
              <Input
                label="Industry"
                type="text"
                placeholder="e.g., Technology, Finance"
                value={filters?.industry}
                onChange={(e) => setFilters({...filters, industry: e?.target?.value})}
              />
              <Input
                label="Engagement Level"
                type="text"
                placeholder="e.g., High, Medium, Low"
                value={filters?.engagementLevel}
                onChange={(e) => setFilters({...filters, engagementLevel: e?.target?.value})}
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <Button variant="ghost" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleCreateSegment}>
                Create Segment
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Predefined Segments */}
      <div className="space-y-3">
        {predefinedSegments?.map((segment) => (
          <div key={segment?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h4 className="font-medium text-foreground">{segment?.name}</h4>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {segment?.count?.toLocaleString()} users
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{segment?.description}</p>
              <p className="text-xs text-muted-foreground">{segment?.criteria}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Users">
                View
              </Button>
              <Button variant="ghost" size="sm" iconName="Mail">
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSegmentationTool;