import React from 'react';
import Icon from '@/Component/AppIcon';


const ViewToggle = ({ currentView, onViewChange, resultCount, sortBy, onSortChange }) => {
  const viewOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'map', icon: 'Map', label: 'Map View' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'graduation-year', label: 'Graduation Year' },
    { value: 'industry', label: 'Industry' },
    { value: 'location', label: 'Location' },
    { value: 'connections', label: 'Most Connected' },
    { value: 'recent', label: 'Recently Active' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Search" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {resultCount?.toLocaleString()} alumni found
        </span>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onViewChange(option?.value)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === option?.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title={option?.label}
            >
              <Icon name={option?.icon} size={16} />
              <span className="hidden sm:inline">{option?.label?.split(' ')?.[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;