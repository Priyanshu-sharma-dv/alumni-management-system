import React from "react";
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import Image from "@/Component/AppImage";


const MentorMatchCard = ({ mentor, matchScore, onConnect, onViewProfile }) => {
  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={mentor?.avatar}
            alt={mentor?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground text-lg">{mentor?.name}</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(matchScore)}`}>
              {matchScore}% match
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-1">{mentor?.title}</p>
          <p className="text-muted-foreground text-sm">{mentor?.company}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {mentor?.bio}
        </p>
      </div>
      <div className="space-y-3 mb-4">
        <div>
          <div className="text-sm font-medium text-foreground mb-2">Expertise:</div>
          <div className="flex flex-wrap gap-2">
            {mentor?.expertise?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {mentor?.expertise?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{mentor?.expertise?.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground mb-2">Why we matched you:</div>
          <div className="space-y-1">
            {mentor?.matchReasons?.map((reason, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Check" size={12} className="text-green-500" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{mentor?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="GraduationCap" size={14} />
            <span>Class of {mentor?.graduationYear}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} className="text-yellow-500" />
          <span>{mentor?.rating} ({mentor?.reviews} reviews)</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={14} />
          <span>{mentor?.mentees} current mentees</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(mentor?.id)}
            iconName="Eye"
            iconPosition="left"
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onConnect(mentor?.id)}
            iconName="MessageCircle"
            iconPosition="right"
          >
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorMatchCard;