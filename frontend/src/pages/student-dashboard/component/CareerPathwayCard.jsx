import React from 'react';
import Icon from '@/Component/AppIcon';

const CareerPathwayCard = ({ pathway, progress, onExplore }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon name={pathway?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{pathway?.title}</h3>
            <p className="text-muted-foreground text-sm">{pathway?.field}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{progress}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {pathway?.description}
      </p>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="text-sm font-medium text-foreground mb-2">Key Milestones:</div>
        {pathway?.milestones?.map((milestone, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              milestone?.completed 
                ? 'bg-green-500' 
                : index === pathway?.milestones?.findIndex(m => !m?.completed)
                  ? 'bg-primary' :'bg-muted'
            }`}>
              {milestone?.completed && (
                <Icon name="Check" size={10} className="text-white" />
              )}
            </div>
            <span className={`text-sm ${
              milestone?.completed 
                ? 'text-muted-foreground line-through' 
                : 'text-foreground'
            }`}>
              {milestone?.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{pathway?.alumni} alumni</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} />
            <span>{pathway?.growth}% growth</span>
          </div>
        </div>
        <button
          onClick={() => onExplore(pathway?.id)}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
        >
          Explore Path →
        </button>
      </div>
    </div>
  );
};

export default CareerPathwayCard;