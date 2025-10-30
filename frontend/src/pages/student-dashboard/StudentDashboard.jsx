import React, { useState, useEffect, useRef } from "react";

// UI (global components)
import Header from "../../Component/ui/Header";
import { studentAPI } from "@/utils/api";

// Student dashboard local components
import OpportunityCard from "./component/OpportunityCard";
import CareerPathwayCard from "./component/CareerPathwayCard";
import SkillAssessmentCard from "./component/SkillAssessmentCard";
import MentorMatchCard from "./component/MentorMatchCard";
import EventCard from "./component/EventCard";
import QuickStat from "./component/QuickStatsCard"; // maan ke chhota component bhi isi folder me hai

// Mock data (rich, dashboard-ready)
const mockOpportunities = [
  {
    id: 1,
    title: "Frontend Developer Internship",
    company: "TechCorp",
    location: "Remote",
    deadline: "2025-01-30",
    type: "internship",
    description: "Join our team to build UI features with React and Tailwind.",
    skills: ["React", "JavaScript", "HTML/CSS"],
    duration: "12 weeks",
    postedBy: "Recruiting Team",
    saved: false
  },
  {
    id: 2,
    title: "Data Analyst Trainee",
    company: "DataWorks",
    location: "Bangalore",
    deadline: "2025-02-10",
    type: "job",
    description: "Analyze datasets and build dashboards with SQL and Python.",
    skills: ["SQL", "Python", "Excel"],
    duration: "Full-time",
    postedBy: "Campus Hiring",
    saved: true
  },
];

const mockCareerPathways = [
  {
    id: 1,
    title: "Software Development",
    field: "Web Engineering",
    icon: "Code2",
    description: "Master fundamentals and build real projects to become a developer.",
    milestones: [
      { title: "JavaScript Fundamentals", completed: true },
      { title: "React Basics", completed: true },
      { title: "Build 3 Portfolio Projects", completed: false },
      { title: "Internship", completed: false }
    ],
    alumni: 124,
    growth: 18
  },
  {
    id: 2,
    title: "Data Science",
    field: "Analytics & ML",
    icon: "BarChart3",
    description: "From data wrangling to ML models and storytelling.",
    milestones: [
      { title: "Python + Numpy/Pandas", completed: true },
      { title: "Statistics", completed: false },
      { title: "Machine Learning", completed: false },
      { title: "Capstone Project", completed: false }
    ],
    alumni: 86,
    growth: 22
  },
];

const mockMentors = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face",
    expertise: ["React", "System Design", "Career Growth"],
    bio: "Helping students transition into frontend roles.",
    matchReasons: ["Shared interest in React", "Similar project background"],
    location: "Remote",
    graduationYear: 2019,
    rating: 4.8,
    reviews: 32,
    mentees: 5
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Data Scientist",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face",
    expertise: ["Machine Learning", "Python", "AI"],
    bio: "Keen on mentoring first ML projects.",
    matchReasons: ["Strong Python base", "Interest in ML"],
    location: "On-site",
    graduationYear: 2017,
    rating: 4.6,
    reviews: 21,
    mentees: 3
  },
];

const mockAssessments = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    category: "Frontend",
    icon: "Squares",
    description: "Test your knowledge of components, state, and props.",
    questions: 10,
    duration: 15,
    taken: 230,
    difficulty: "beginner",
    completed: false,
    skills: ["Components", "State", "Props"]
  },
  {
    id: 2,
    title: "Data Structures Test",
    category: "DSA",
    icon: "Stack",
    description: "Check your fundamentals across common data structures.",
    questions: 20,
    duration: 30,
    taken: 180,
    difficulty: "intermediate",
    completed: true,
    completedDate: "2025-01-05",
    results: { level: "intermediate", score: 72 },
    skills: ["Arrays", "Linked Lists", "Stacks/Queues"]
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Alumni Networking Session",
    type: "networking",
    featured: true,
    date: "2025-01-15T10:00:00Z",
    isVirtual: true,
    location: "Online",
    attendees: 120,
    capacity: 200,
    price: 0,
    tags: ["career", "networking"],
    speakers: ["Priya Singh", "Rahul Mehta"],
    registered: false,
    description: "Meet alumni working in top companies and expand your network."
  },
  {
    id: 2,
    title: "Hackathon 2025",
    type: "career-fair",
    featured: false,
    date: "2025-02-05T09:00:00Z",
    isVirtual: false,
    location: "Campus Auditorium",
    attendees: 80,
    capacity: 120,
    price: 10,
    tags: ["hackathon", "innovation"],
    registered: true,
    description: "24-hour hackathon to showcase your coding and innovation skills."
  },
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("opportunities");
  const [language, setLanguage] = useState("en");
  // Local state for interactivity
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [pathwaysProgress, setPathwaysProgress] = useState({ 1: 45, 2: 20 });
  const [assessments, setAssessments] = useState(mockAssessments);
  const [mentors, setMentors] = useState(mockMentors);
  const [events, setEvents] = useState(mockEvents);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [uploadedResume, setUploadedResume] = useState("");
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) setLanguage(storedLang);
  }, []);

  // Example: hydrate from backend on mount (optional)
  useEffect(() => {
    // In a real app, handle errors and loading states
    (async () => {
      try {
        const [ops, progress, asses, mens, evs] = await Promise.all([
          studentAPI.getOpportunities(),
          studentAPI.getPathwaysProgress(),
          studentAPI.getAssessments(),
          studentAPI.getMentors(),
          studentAPI.getEvents(),
        ]);
        setOpportunities(ops || opportunities);
        setPathwaysProgress(progress || pathwaysProgress);
        setAssessments(asses || assessments);
        setMentors(prev => prev.map(m => ({ ...m, mentees: (mens.find(x => x.id === m.id)?.mentees ?? m.mentees) })));
        setEvents(prev => prev.map(e => ({ ...e, registered: (evs.find(x => x.id === e.id)?.registered ?? e.registered), attendees: (evs.find(x => x.id === e.id)?.attendees ?? e.attendees) })));
      } catch (_) {
        // fallback to local mock state
      }
    })();
  }, []);

  // Handlers — wire features to UI
  const handleApplyOpportunity = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, applied: true } : o));
    // fire and forget backend call
    studentAPI.applyOpportunity(id).catch(() => {});
    alert("Application submitted.");
  };

  const handleSaveOpportunity = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
    studentAPI.saveOpportunity(id).catch(() => {});
  };

  const handleExplorePathway = (id) => {
    setPathwaysProgress(prev => ({ ...prev, [id]: Math.min(100, (prev[id] || 0) + 5) }));
    studentAPI.incrementPathwayProgress(id).catch(() => {});
  };

  const handleStartAssessment = (id) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, completed: true, results: { level: "beginner", score: 60 }, completedDate: new Date().toISOString().slice(0,10) } : a));
    studentAPI.startAssessment(id).catch(() => {});
  };

  const handleViewAssessmentResults = () => {
    alert("Opening your assessment results...");
  };

  const handleConnectMentor = (id) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, mentees: m.mentees + 1 } : m));
    studentAPI.connectMentor(id).catch(() => {});
    alert("Connection request sent to mentor.");
  };

  const handleViewMentorProfile = () => {
    alert("Opening mentor profile...");
  };

  const handleRegisterEvent = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, registered: true, attendees: Math.min(e.capacity, e.attendees + 1) } : e));
    studentAPI.registerEvent(id).catch(() => {});
  };

  const handleAddEventToCalendar = () => {
    alert("Event added to your calendar.");
  };

  // Quick actions
  const handleUploadResumeClick = () => {
    if (resumeInputRef.current) resumeInputRef.current.click();
  };

  const handleResumeSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setUploadedResume(file.name);
      studentAPI.uploadResume(file)
        .then(() => alert(`Resume uploaded: ${file.name}`))
        .catch(() => alert('Failed to upload resume'));
      // reset so same file can be selected again if needed
      e.target.value = "";
    }
  };

  const handleUpdateProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCareerAssessmentClick = () => {
    setActiveTab("assessments");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <QuickStat title="Applied Opportunities" value={opportunities.filter(o => o.applied).length} icon="Send" color="info" />
          <QuickStat title="Mentors Connected" value={mentors.reduce((a,m)=>a+(m.mentees?1:0),0)} icon="Users" color="primary" />
          <QuickStat title="Assessments Completed" value={assessments.filter(a => a.completed).length} icon="CheckCircle" color="success" />
          <QuickStat title="Events Registered" value={events.filter(e => e.registered).length} icon="CalendarCheck" color="secondary" />
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-6">
            {["opportunities", "pathways", "assessments", "mentors", "events"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`pb-4 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "opportunities" && (
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    onApply={handleApplyOpportunity}
                    onSave={handleSaveOpportunity}
                  />
                ))}
              </div>
            )}

            {activeTab === "pathways" && (
              <div className="space-y-4">
                {mockCareerPathways.map((path) => (
                  <CareerPathwayCard
                    key={path.id}
                    pathway={path}
                    progress={pathwaysProgress[path.id] || 0}
                    onExplore={handleExplorePathway}
                  />
                ))}
              </div>
            )}

            {activeTab === "assessments" && (
              <div className="space-y-4">
                {assessments.map((assess) => (
                  <SkillAssessmentCard
                    key={assess.id}
                    assessment={assess}
                    onStart={handleStartAssessment}
                    onViewResults={handleViewAssessmentResults}
                  />
                ))}
              </div>
            )}

            {activeTab === "mentors" && (
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <MentorMatchCard
                    key={mentor.id}
                    mentor={mentor}
                    matchScore={mentor.id === 1 ? 92 : 78}
                    onConnect={handleConnectMentor}
                    onViewProfile={handleViewMentorProfile}
                  />
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="space-y-4">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleRegisterEvent}
                    onAddToCalendar={handleAddEventToCalendar}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={handleUploadResumeClick} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Upload Resume
                </button>
                <button onClick={handleUpdateProfileClick} className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                  Update Profile
                </button>
                <button onClick={handleCareerAssessmentClick} className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                  Career Assessment
                </button>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeSelected}
                />
                {uploadedResume && (
                  <p className="text-xs text-gray-500">Last uploaded: {uploadedResume}</p>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
              <ul className="space-y-3">
                {opportunities.slice(0, 2).map((opp) => (
                  <li key={opp.id} className="text-sm">
                    <p className="font-medium">{opp.title}</p>
                    <p className="text-gray-500 text-xs">
                      Deadline: {opp.deadline}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              <ul className="space-y-3">
                {events.slice(0, 2).map((event) => (
                  <li key={event.id} className="text-sm">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Simple Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Update Profile</h4>
              <button onClick={() => setShowProfileModal(false)} className="p-2 text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Profile editing UI coming soon. In the meantime, you can update your profile from the login portal after registration.
            </p>
            <div className="text-right">
              <button onClick={() => setShowProfileModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
