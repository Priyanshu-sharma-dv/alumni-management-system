import React from 'react';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';

const SkillAssessmentCard = ({ assessment, onStart, onViewResults }) => {
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-red-100 text-red-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-green-100 text-green-700';
      case 'expert':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSkillLevelIcon = (level) => {
    switch (level) {
      case 'beginner':
        return 'Play';
      case 'intermediate':
        return 'BarChart3';
      case 'advanced':
        return 'TrendingUp';
      case 'expert':
        return 'Award';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Icon name={assessment?.icon} size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{assessment?.title}</h3>
            <p className="text-muted-foreground text-sm">{assessment?.category}</p>
          </div>
        </div>
        {assessment?.completed && (
          <div className="flex items-center space-x-1 text-green-600">
            <Icon name="CheckCircle" size={16} />
            <span className="text-xs font-medium">Completed</span>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {assessment?.description}
      </p>
      {assessment?.completed && assessment?.results && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Your Level:</span>
            <div className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 ${getSkillLevelColor(assessment?.results?.level)}`}>
              <Icon name={getSkillLevelIcon(assessment?.results?.level)} size={12} />
              <span className="capitalize">{assessment?.results?.level}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Score:</span>
            <span className="font-medium text-foreground">{assessment?.results?.score}/100</span>
          </div>
        </div>
      )}
      <div className="space-y-2 mb-4">
        <div className="text-sm font-medium text-foreground">Skills Covered:</div>
        <div className="flex flex-wrap gap-2">
          {assessment?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{assessment?.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HelpCircle" size={14} />
            <span>{assessment?.questions} questions</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>{assessment?.taken} taken</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {assessment?.completed 
            ? `Completed on ${assessment?.completedDate}`
            : `Difficulty: ${assessment?.difficulty}`
          }
        </div>
        {assessment?.completed ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewResults(assessment?.id)}
            iconName="BarChart3"
            iconPosition="left"
          >
            View Results
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => onStart(assessment?.id)}
            iconName="Play"
            iconPosition="right"
          >
            Start Assessment
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillAssessmentCard;