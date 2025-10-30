import React, { useState } from 'react';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";


const ReportGenerator = ({ onGenerateReport }) => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [reportFrequency, setReportFrequency] = useState('monthly');

  const availableReports = [
    {
      id: 'engagement',
      name: 'Engagement Analytics',
      description: 'User activity, login frequency, and platform usage metrics',
      icon: 'Activity',
      estimatedTime: '2-3 minutes',
      lastGenerated: '2025-09-26'
    },
    {
      id: 'fundraising',
      name: 'Fundraising Performance',
      description: 'Campaign results, donation trends, and donor analytics',
      icon: 'DollarSign',
      estimatedTime: '3-4 minutes',
      lastGenerated: '2025-09-25'
    },
    {
      id: 'events',
      name: 'Event Participation',
      description: 'Attendance rates, event feedback, and engagement scores',
      icon: 'Calendar',
      estimatedTime: '2-3 minutes',
      lastGenerated: '2025-09-24'
    },
    {
      id: 'mentorship',
      name: 'Mentorship Program',
      description: 'Matching success rates, program outcomes, and satisfaction scores',
      icon: 'UserCheck',
      estimatedTime: '4-5 minutes',
      lastGenerated: '2025-09-23'
    },
    {
      id: 'demographics',
      name: 'Alumni Demographics',
      description: 'Geographic distribution, industry breakdown, and graduation year analysis',
      icon: 'Users',
      estimatedTime: '3-4 minutes',
      lastGenerated: '2025-09-22'
    },
    {
      id: 'communication',
      name: 'Communication Effectiveness',
      description: 'Email open rates, click-through rates, and response analytics',
      icon: 'Mail',
      estimatedTime: '2-3 minutes',
      lastGenerated: '2025-09-21'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly Engagement Summary',
      frequency: 'Monthly',
      nextRun: '2025-10-01',
      recipients: ['admin@university.edu', 'relations@university.edu'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Weekly Fundraising Update',
      frequency: 'Weekly',
      nextRun: '2025-09-30',
      recipients: ['development@university.edu'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Quarterly Alumni Survey',
      frequency: 'Quarterly',
      nextRun: '2025-12-01',
      recipients: ['president@university.edu', 'board@university.edu'],
      status: 'paused'
    }
  ];

  const handleReportToggle = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleGenerateReports = () => {
    if (selectedReports?.length > 0) {
      onGenerateReport({
        reports: selectedReports,
        frequency: reportFrequency,
        timestamp: new Date()?.toISOString()
      });
      setSelectedReports([]);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Generator</h3>
          <p className="text-sm text-muted-foreground">Generate comprehensive analytics reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={reportFrequency}
            onChange={(e) => setReportFrequency(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="once">Generate Once</option>
            <option value="weekly">Weekly Schedule</option>
            <option value="monthly">Monthly Schedule</option>
            <option value="quarterly">Quarterly Schedule</option>
          </select>
          <Button 
            variant="default" 
            iconName="Download" 
            onClick={handleGenerateReports}
            disabled={selectedReports?.length === 0}
          >
            Generate Reports
          </Button>
        </div>
      </div>
      {/* Available Reports */}
      <div className="space-y-4 mb-8">
        <h4 className="font-medium text-foreground">Available Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableReports?.map((report) => (
            <div 
              key={report?.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedReports?.includes(report?.id)
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onClick={() => handleReportToggle(report?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedReports?.includes(report?.id) 
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={report?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-foreground">{report?.name}</h5>
                    {selectedReports?.includes(report?.id) && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report?.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Est. time: {report?.estimatedTime}</span>
                    <span>Last: {report?.lastGenerated}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Scheduled Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Scheduled Reports</h4>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Schedule
          </Button>
        </div>
        <div className="space-y-3">
          {scheduledReports?.map((schedule) => (
            <div key={schedule?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h5 className="font-medium text-foreground">{schedule?.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    schedule?.status === 'active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {schedule?.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {schedule?.frequency} • Next run: {schedule?.nextRun}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Recipients: {schedule?.recipients?.join(', ')}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Play">
                  Run Now
                </Button>
                <Button variant="ghost" size="sm" iconName="Pause">
                  {schedule?.status === 'active' ? 'Pause' : 'Resume'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;