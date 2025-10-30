import React from 'react';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';

const DonationImpact = ({ donationData }) => {
  const impactMetrics = [
    {
      label: 'Scholarships Funded',
      value: donationData?.scholarshipsFunded,
      icon: 'GraduationCap',
      color: 'text-blue-600'
    },
    {
      label: 'Students Helped',
      value: donationData?.studentsHelped,
      icon: 'Users',
      color: 'text-green-600'
    },
    {
      label: 'Programs Supported',
      value: donationData?.programsSupported,
      icon: 'BookOpen',
      color: 'text-purple-600'
    }
  ];

  const progressPercentage = (donationData?.currentAmount / donationData?.goalAmount) * 100;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Your Impact</h2>
        <Icon name="Heart" size={20} className="text-red-500" />
      </div>
      {/* Personal Giving Summary */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-foreground">
              ${donationData?.totalPersonalDonations?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Contributions</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              {donationData?.donationCount}
            </div>
            <div className="text-sm text-muted-foreground">Donations Made</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={14} />
          <span>Rank #{donationData?.donorRank} among Class of {donationData?.graduationYear}</span>
        </div>
      </div>
      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {impactMetrics?.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 ${metric?.color}`}>
              <Icon name={metric?.icon} size={20} />
            </div>
            <div className="text-lg font-bold text-foreground">{metric?.value}</div>
            <div className="text-xs text-muted-foreground">{metric?.label}</div>
          </div>
        ))}
      </div>
      {/* Current Campaign */}
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">{donationData?.currentCampaign}</h3>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            ${donationData?.currentAmount?.toLocaleString()} raised
          </span>
          <span className="text-muted-foreground">
            Goal: ${donationData?.goalAmount?.toLocaleString()}
          </span>
        </div>
      </div>
      {/* Recent Donation */}
      {donationData?.lastDonation && (
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Last Donation</div>
              <div className="text-xs text-muted-foreground">
                ${donationData?.lastDonation?.amount} • {donationData?.lastDonation?.date}
              </div>
            </div>
            <Icon name="Check" size={16} className="text-green-600" />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="default" className="flex-1">
          <Icon name="Heart" size={16} className="mr-2" />
          Donate Now
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Share" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DonationImpact;