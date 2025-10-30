import React from 'react';
import Icon from '@/Component/AppIcon';

const RoleSelector = ({ selectedRole, onRoleSelect, className = '' }) => {
  const roles = [
    {
      id: 'alumni',
      title: 'Alumni',
      description: 'Career-focused professionals seeking networking and mentorship opportunities',
      icon: 'GraduationCap',
      color: 'from-primary to-accent',
      features: ['Professional Networking', 'Mentorship Programs', 'Career Resources', 'Alumni Directory']
    },
    {
      id: 'student',
      title: 'Current Student',
      description: 'Ambitious learners seeking mentorship, internships, and career guidance',
      icon: 'BookOpen',
      color: 'from-secondary to-trust-builder',
      features: ['Mentorship Access', 'Internship Opportunities', 'Career Guidance', 'Alumni Connections']
    },
    {
      id: 'admin',
      title: 'Admin (College Staff)',
      description: 'Manage alumni data, student mentorships, and institutional events',
      icon: 'Shield',
      color: 'from-purple-500 to-indigo-500',
      features: ['Manage Alumni', 'Oversee Students', 'Host Events', 'Access Dashboards']
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Your Role</h3>
        <p className="text-sm text-muted-foreground">Choose the option that best describes you</p>
      </div>
      <div className="grid gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedRole === role.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={role.icon} size={24} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{role.title}</h4>
                  {selectedRole === role.id && (
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {role.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-conversion-accent" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
