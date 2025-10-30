import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/Component/ui/Header";
import WelcomeHeader from "./component/WelcomeHeader";
import QuickActions from "./component/QuickActions";
import StatsOverview from "./component/StatsOverview";
import ActivityFeed from "./component/ActivityFeed";
import MentorshipQueue from "./component/MentorshipQueue";
import UpcomingEvents from "./component/UpcomingEvents";
import DonationImpact from "./component/DonationImpact";
import NetworkingSuggestions from "./component/NetworkingSuggestions";
import AchievementBadges from "./component/AchievementBadges";
import { alumniDashboardAPI, authAPI } from "@/utils/api";

const AlumniDashboard = () => {
    // ----------------- State Declarations -----------------
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);
    const [mentorshipRequests, setMentorshipRequests] = useState([]);
    const [events, setEvents] = useState([]);
    const [donationData, setDonationData] = useState(null);
    const [networkingSuggestions, setNetworkingSuggestions] = useState([]);
    const [achievements, setAchievements] = useState(null);

    // ----------------- Load Data from API -----------------
    useEffect(() => {
        const normalizeUser = (raw) => {
            const u = raw?.user || raw;
            if (!u) return null;
            const fullName = u.name || '';
            const firstName = fullName.split(' ')[0] || '';
            const profileImage = u.profile_image ? `/uploads/${u.profile_image}` : u.profileImage;
            return {
                id: u.id,
                name: fullName,
                firstName,
                title: u.title || '',
                company: u.company || '',
                graduationYear: u.graduationYear || u.graduation_year || '',
                location: u.location || '',
                connections: u.connections || 0,
                impactScore: u.impactScore || 0,
                avatar: profileImage,
                role: u.role,
            };
        };
        const loadDashboardData = async () => {
            try {
                const [
                    userResp,
                    statsData,
                    activitiesData,
                    mentorshipRequestsData,
                    eventsData,
                    donationDataData,
                    networkingSuggestionsData,
                    achievementsData,
                ] = await Promise.all([
                    authAPI.getUser(),
                    alumniDashboardAPI.getStats(),
                    alumniDashboardAPI.getActivities(),
                    alumniDashboardAPI.getMentorshipRequests(),
                    alumniDashboardAPI.getEvents(),
                    alumniDashboardAPI.getDonationData(),
                    alumniDashboardAPI.getNetworkingSuggestions(),
                    alumniDashboardAPI.getAchievements(),
                ]);

                setUser(normalizeUser(userResp));
                setStats(statsData);
                setActivities(activitiesData);
                setMentorshipRequests(mentorshipRequestsData);
                setEvents(eventsData);
                setDonationData(donationDataData);
                setNetworkingSuggestions(networkingSuggestionsData);
                setAchievements(achievementsData);
            } catch (error) {
                console.error("Failed to load alumni dashboard data:", error);
                // Fallback to mock data if API fails
                setUser({
                    id: 1,
                    name: "Sarah Johnson",
                    firstName: "Sarah",
                    title: "Senior Software Engineer",
                    company: "Google",
                    graduationYear: 2018,
                    location: "San Francisco, CA",
                    connections: 247,
                    impactScore: 1250,
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                });
                setStats({
                    connections: 247,
                    mentorshipSessions: 12,
                    eventsAttended: 8,
                    totalDonations: 2500,
                });
            }
        };

        loadDashboardData();
    }, []);

    // ----------------- Quick Actions -----------------
    const handleQuickAction = async (actionId) => {
        try {
            await alumniDashboardAPI.performQuickAction(actionId);
            
            switch (actionId) {
                case 'update-profile':
                    window.location.href = '/profile';
                    break;
                case 'find-alumni':
                    window.location.href = '/alumni-directory';
                    break;
                case 'post-job':
                    // Could open a modal or redirect to job posting page
                    alert('Job posting feature coming soon!');
                    break;
                case 'make-donation':
                    // Could open a modal or redirect to donation page
                    alert('Donation feature coming soon!');
                    break;
                default:
                    console.log(`Quick action performed: ${actionId}`);
            }
        } catch (error) {
            console.error('Failed to perform quick action:', error);
        }
    };

    // ----------------- Mentorship Request Handler -----------------
    const handleMentorshipRequestUpdate = (requestId, response) => {
        setMentorshipRequests(prev => prev.filter(req => req.id !== requestId));
    };

    // ----------------- Event Registration Handler -----------------
    const handleEventRegistration = (eventId) => {
        setEvents(prev => prev.map(event => 
            event.id === eventId 
                ? { ...event, registered: true, attendees: event.attendees + 1 }
                : event
        ));
    };

    // ----------------- Render -----------------
    if (!user || !stats) return <div>Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <WelcomeHeader user={user} />

                {/* Quick Actions */}
                <QuickActions onActionClick={handleQuickAction} />

                {/* Stats Overview */}
                <StatsOverview stats={stats} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">
                        <ActivityFeed activities={activities} />
                        <UpcomingEvents events={events} onRegister={handleEventRegistration} />
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        <MentorshipQueue requests={mentorshipRequests} onRequestUpdate={handleMentorshipRequestUpdate} />
                        <DonationImpact donationData={donationData} />
                        <NetworkingSuggestions suggestions={networkingSuggestions} />
                        <AchievementBadges achievements={achievements} />
                    </div>
                </div>

                {/* Explore More */}
                <div className="mt-12 bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Explore More
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Link
                            to="/alumni-directory"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-semibold">AD</span>
                            </div>
                            <div>
                                <div className="font-medium text-foreground">
                                    Alumni Directory
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Find connections
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/events"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-sm font-semibold">EV</span>
                            </div>
                            <div>
                                <div className="font-medium text-foreground">Events</div>
                                <div className="text-xs text-muted-foreground">
                                    Upcoming activities
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/career-center"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 text-sm font-semibold">CC</span>
                            </div>
                            <div>
                                <div className="font-medium text-foreground">Career Center</div>
                                <div className="text-xs text-muted-foreground">
                                    Job opportunities
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AlumniDashboard;
