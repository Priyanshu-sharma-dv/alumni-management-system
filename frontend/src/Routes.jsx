import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "@/Component/ScrollToTop";
import ErrorBoundary from "@/Component/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin-dashboard/AdminDashboard";
import AlumniDirectory from "@/pages/alumni-directory/AlumniDirectory";
import AlumniDashboard from "@/pages/alumni-dashboard/AlumniDashboard";
import StudentDashboard from "@/pages/student-dashboard/StudentDashboard";
import LoginPortal from "./pages/login-portal/LoginPortal";
import Homepage from "@/pages/homepage";
import CreateEvent from "@/pages/events/CreateEvent";
import CreateMentorship from "@/pages/mentorships/CreateMentorship";
import CreateAdmin from "@/pages/admin-dashboard/CreateAdmin";
import Profile from "@/pages/profile/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
          <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/mentorships/create" element={<CreateMentorship />} />
          <Route path="/admin/create" element={<CreateAdmin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login-portal" element={<LoginPortal />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
