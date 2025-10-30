import React from 'react';
import { Link } from 'react-router-dom';
import Icon from "@/Component/AppIcon";



const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Alumni Dashboard', path: '/alumni-dashboard' },
        { name: 'Student Portal', path: '/student-dashboard' },
        { name: 'Alumni Directory', path: '/alumni-directory' },
        { name: 'Events Calendar', path: '/events' },
        { name: 'Mentorship Program', path: '/mentorship' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Career Center', path: '/career-center' },
        { name: 'Learning Hub', path: '/learning' },
        { name: 'Success Stories', path: '/success-stories' },
        { name: 'News & Updates', path: '/news' },
        { name: 'Help Center', path: '/help' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Alumni Groups', path: '/groups' },
        { name: 'Discussion Forums', path: '/forums' },
        { name: 'Volunteer Opportunities', path: '/volunteer' },
        { name: 'Give Back', path: '/donations' },
        { name: 'Contact Alumni Relations', path: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About AlumniConnect', path: '/about' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/alumniconnect' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/alumniconnect' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/alumniconnect' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/alumniconnect' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/alumniconnect' }
  ];

  const quickStats = [
    { number: '25,000+', label: 'Active Alumni' },
    { number: '8,500+', label: 'Current Students' },
    { number: '150+', label: 'Countries' },
    { number: '500+', label: 'Partner Companies' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7L12 12L21 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 17L12 22L21 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 12L12 17L21 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">AlumniConnect</h3>
                <p className="text-sm text-primary font-medium">Pro</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Bridging the gap between academic achievement and real-world success. 
              Join thousands of alumni building careers, sharing opportunities, and creating lasting impact.
            </p>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-foreground mb-4">Our Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                {quickStats?.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-primary">{stat?.number}</div>
                    <div className="text-xs text-muted-foreground">{stat?.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-foreground mb-3">Stay Connected</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest alumni news, events, and opportunities delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{section?.title}</h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <Link
                      to={link?.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} AlumniConnect Pro. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Terms
                </Link>
                <Link
                  to="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Award" size={16} className="text-primary" />
                <span>Trusted by 25K+ Alumni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 z-50 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <Icon name="ArrowUp" size={20} />
      </button>
    </footer>
  );
};

export default Footer;