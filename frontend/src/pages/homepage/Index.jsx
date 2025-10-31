import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './component/HeroSection';
import RoleSelectionCards from './component/RoleSelectionCards';
import CommunityMetrics from './component/CommunityMetrics';
import TestimonialsSection from './component/TestimonialsSection';
import Footer from './component/Footer';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>AlumniConnect Pro - Lifelong Learning, Lasting Connections</title>
        <meta
          name="description"
          content="Join thousands of alumni building careers, sharing opportunities, and creating lasting impact. Connect with mentors, find opportunities, and give back to the next generation."
        />
        <meta name="keywords" content="alumni network, career advancement, mentorship, professional networking, university alumni" />
        <meta property="og:title" content="AlumniConnect Pro - Your Network is Your Net Worth" />
        <meta property="og:description" content="Transform your career through meaningful alumni connections. Join 25,000+ professionals worldwide." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Role Selection Cards */}
        <RoleSelectionCards />

        {/* Community Metrics */}
        <CommunityMetrics />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;