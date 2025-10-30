import React from 'react';
 import Button from "@/component/ui/Button";                     
  import Input from "@/component/ui/Input";

const CampaignCard = ({ campaign, onEdit, onView, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success border-success/20',
      draft: 'bg-warning/10 text-warning border-warning/20',
      completed: 'bg-secondary/10 text-secondary border-secondary/20',
      paused: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.draft;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-primary';
    if (percentage >= 25) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{campaign?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign?.status)}`}>
              {campaign?.status?.charAt(0)?.toUpperCase() + campaign?.status?.slice(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{campaign?.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Eye" onClick={() => onView(campaign?.id)}>
            View
          </Button>
          <Button variant="ghost" size="sm" iconName="Edit" onClick={() => onEdit(campaign?.id)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(campaign?.id)}>
            Delete
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{campaign?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(campaign?.progress)}`}
              style={{ width: `${campaign?.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">${campaign?.raised?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Raised</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">${campaign?.goal?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Goal</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{campaign?.donors}</div>
            <div className="text-xs text-muted-foreground">Donors</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Started: {campaign?.startDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Ends: {campaign?.endDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;