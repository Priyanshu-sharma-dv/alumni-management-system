import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import Header from "@/Component/ui/Header";  
import { authAPI, alumniAPI } from "@/utils/api";
import MetricsCard from './component/MetricsCard';
import EngagementChart from './component/EngagementChart';
import CampaignCard from './component/CampaignCard';
import UserSegmentationTool from './component/UserSegmentationTool';
import CommunicationComposer from './component/CommunicationComposer';
import ReportGenerator from './component/ReportGenerator';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState(null);
  const [totalAlumni, setTotalAlumni] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock data for dashboard metrics
  const dashboardMetrics = [
    {
      title: "Total Alumni",
      value: totalAlumni !== null ? totalAlumni.toLocaleString() : '—',
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Users",
      value: "8,934",
      change: "+8%",
      changeType: "positive",
      icon: "Activity",
      color: "success"
    },
    {
      title: "Monthly Events",
      value: "24",
      change: "+15%",
      changeType: "positive",
      icon: "Calendar",
      color: "secondary"
    },
    {
      title: "Donations This Month",
      value: "$127,500",
      change: "+23%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Mentorship Matches",
      value: "342",
      change: "+18%",
      changeType: "positive",
      icon: "UserCheck",
      color: "primary"
    },
    {
      title: "Job Placements",
      value: "89",
      change: "+7%",
      changeType: "positive",
      icon: "Briefcase",
      color: "secondary"
    }
  ];

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: "Annual Scholarship Fund",
      description: "Supporting deserving students with financial assistance for their education",
      status: "active",
      progress: 78,
      raised: 156000,
      goal: 200000,
      donors: 234,
      startDate: "2025-01-15",
      endDate: "2025-12-31"
    },
    {
      id: 2,
      name: "New Library Construction",
      description: "Building a state-of-the-art library facility for current and future students",
      status: "active",
      progress: 45,
      raised: 890000,
      goal: 2000000,
      donors: 567,
      startDate: "2025-03-01",
      endDate: "2026-02-28"
    },
    {
      id: 3,
      name: "Alumni Mentorship Program",
      description: "Expanding our mentorship program to connect more alumni with current students",
      status: "draft",
      progress: 0,
      raised: 0,
      goal: 50000,
      donors: 0,
      startDate: "2025-10-01",
      endDate: "2025-12-31"
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "user_registration",
      message: "Sarah Johnson (Class of 2019) joined the platform",
      timestamp: "2 hours ago",
      icon: "UserPlus"
    },
    {
      id: 2,
      type: "donation",
      message: "Michael Chen donated $500 to Annual Scholarship Fund",
      timestamp: "4 hours ago",
      icon: "Heart"
    },
    {
      id: 3,
      type: "event_registration",
      message: "45 new registrations for Tech Industry Networking Event",
      timestamp: "6 hours ago",
      icon: "Calendar"
    },
    {
      id: 4,
      type: "mentorship",
      message: "New mentorship match: David Park & Emma Wilson",
      timestamp: "8 hours ago",
      icon: "UserCheck"
    },
    {
      id: 5,
      type: "communication",
      message: "Monthly newsletter sent to 12,847 alumni",
      timestamp: "1 day ago",
      icon: "Mail"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'campaigns', name: 'Campaigns', icon: 'Target' },
    { id: 'communications', name: 'Communications', icon: 'Mail' },
    { id: 'analytics', name: 'Analytics', icon: 'BarChart3' },
    { id: 'reports', name: 'Reports', icon: 'FileText' }
  ];

  // Add mock data for charts
  const mockChartData = [
    { date: '2025-01-01', value: 120 },
    { date: '2025-01-02', value: 150 },
    { date: '2025-01-03', value: 180 },
    { date: '2025-01-04', value: 140 },
    { date: '2025-01-05', value: 200 },
    { date: '2025-01-06', value: 170 },
    { date: '2025-01-07', value: 190 }
  ];

  const handleCampaignEdit = (campaignId) => {
    console.log('Edit campaign:', campaignId);
  };

  const handleCampaignView = (campaignId) => {
    console.log('View campaign:', campaignId);
  };

  const handleCampaignDelete = (campaignId) => {
    console.log('Delete campaign:', campaignId);
  };

  const handleCreateSegment = (segmentData) => {
    console.log('Create segment:', segmentData);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: `New segment "${segmentData?.name}" created successfully`,
      type: 'success'
    }]);
  };

  const handleSendMessage = (messageData) => {
    console.log('Send message:', messageData);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: `Message "${messageData?.subject}" ${messageData?.status} successfully`,
      type: 'success'
    }]);
  };

  const handleGenerateReport = (reportData) => {
    console.log('Generate report:', reportData);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: `${reportData?.reports?.length} report(s) generation started`,
      type: 'success'
    }]);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [me, users] = await Promise.all([
          authAPI.getUser(),
          alumniAPI.getAll()
        ]);
        setAdminUser(me?.user || me);
        setTotalAlumni((users || []).length);
      } catch (e) {
        // leave defaults
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            {adminUser && (
              <p className="text-sm text-muted-foreground mt-1">Signed in as {adminUser.name} ({adminUser.email})</p>
            )}
            <p className="text-muted-foreground mt-2">
              Comprehensive analytics and management tools for alumni engagement
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download">
              Export Data
            </Button>
            <Button variant="default" iconName="Plus">
              New Campaign
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart title="User Engagement Trends" type="line" data={mockChartData} />
              <EngagementChart title="Activity Distribution" type="area" data={mockChartData} />
            </div>

            {/* Recent Activities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
                <Link 
                  to="/admin-dashboard/activities" 
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div key={activity?.id} className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Icon name={activity?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity?.message}</p>
                      <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns?.map((campaign) => (
                <CampaignCard
                  key={campaign?.id}
                  campaign={campaign}
                  onEdit={handleCampaignEdit}
                  onView={handleCampaignView}
                  onDelete={handleCampaignDelete}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="space-y-6">
            <CommunicationComposer onSendMessage={handleSendMessage} />
            <UserSegmentationTool onCreateSegment={handleCreateSegment} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart title="Monthly Engagement Analytics" type="line" data={mockChartData} />
              <EngagementChart title="User Activity Heatmap" type="area" data={mockChartData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics?.slice(0, 4)?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <ReportGenerator onGenerateReport={handleGenerateReport} />
          </div>
        )}

        {/* Quick Actions Floating Button */}
        <div className="fixed bottom-6 right-6">
          <div className="relative group">
            <Button 
              variant="default" 
              size="lg" 
              iconName="Plus" 
              className="rounded-full shadow-lg hover:shadow-xl"
            >
              Quick Actions
            </Button>
            
            {/* Quick Actions Menu */}
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Users" size={16} />
                  <span>Add Alumni</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Calendar" size={16} />
                  <span>Create Event</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="Mail" size={16} />
                  <span>Send Message</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="FileText" size={16} />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications?.length > 0 && (
          <div className="fixed top-20 right-6 space-y-2 z-50">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className="bg-success text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-up"
              >
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">{notification?.message}</span>
                <button
                  onClick={() => setNotifications(prev => prev?.filter(n => n?.id !== notification?.id))}
                  className="text-white/80 hover:text-white"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
