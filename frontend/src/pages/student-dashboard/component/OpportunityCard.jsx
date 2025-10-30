import React from 'react';
import Icon from '../../../Component/AppIcon';
import Button from '../../../Component/ui/Button';

const OpportunityCard = ({ opportunity, onApply, onSave }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'internship':
        return 'Briefcase';
      case 'job':
        return 'Building';
      case 'mentorship':
        return 'UserCheck';
      case 'event':
        return 'Calendar';
      default:
        return 'Star';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-700';
      case 'job':
        return 'bg-green-100 text-green-700';
      case 'mentorship':
        return 'bg-purple-100 text-purple-700';
      case 'event':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getTypeColor(opportunity?.type)}`}>
            <Icon name={getTypeIcon(opportunity?.type)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{opportunity?.title}</h3>
            <p className="text-muted-foreground text-sm">{opportunity?.company}</p>
          </div>
        </div>
        <button
          onClick={() => onSave(opportunity?.id)}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name={opportunity?.saved ? "Bookmark" : "BookmarkPlus"} size={18} />
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {opportunity?.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity?.skills?.slice(0, 3)?.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
        {opportunity?.skills?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{opportunity?.skills?.length - 3} more
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{opportunity?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{opportunity?.duration}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{opportunity?.deadline}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-secondary to-trust-builder rounded-full flex items-center justify-center">
            <Icon name="User" size={12} className="text-white" />
          </div>
          <span className="text-sm text-muted-foreground">{opportunity?.postedBy}</span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(opportunity?.id)}
          iconName="Send"
          iconPosition="right"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;