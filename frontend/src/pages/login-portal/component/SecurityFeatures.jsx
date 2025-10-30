import React, { useState } from 'react';
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";

const SecurityFeatures = ({ className = '' }) => {
  const [activeFeature, setActiveFeature] = useState(null);

  const securityFeatures = [
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition for secure, convenient access',
      icon: 'Fingerprint',
      status: 'available',
      details: 'Enable biometric login on supported devices for enhanced security and convenience. Your biometric data is stored locally and never shared.'
    },
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security with SMS or authenticator app',
      icon: 'Shield',
      status: 'recommended',
      details: 'Protect your account with 2FA using SMS codes or authenticator apps like Google Authenticator or Authy.'
    },
    {
      id: 'device-trust',
      title: 'Trusted Devices',
      description: 'Remember this device for 30 days to skip verification',
      icon: 'Smartphone',
      status: 'optional',
      details: 'Mark devices as trusted to streamline future logins while maintaining security. You can manage trusted devices in your account settings.'
    },
    {
      id: 'secure-recovery',
      title: 'Secure Recovery',
      description: 'Multiple recovery options including backup codes and security questions',
      icon: 'Key',
      status: 'enabled',
      details: 'Set up multiple recovery methods to ensure you never lose access to your account, including backup codes and security questions.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'recommended': return 'text-warning';
      case 'optional': return 'text-muted-foreground';
      case 'enabled': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'recommended': return 'AlertTriangle';
      case 'optional': return 'Info';
      case 'enabled': return 'Shield';
      default: return 'Circle';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Advanced Security</h3>
        <p className="text-muted-foreground">
          Your account is protected by enterprise-grade security features
        </p>
      </div>
      <div className="grid gap-4">
        {securityFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md ${
              activeFeature === feature?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setActiveFeature(activeFeature === feature?.id ? null : feature?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-foreground">{feature?.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(feature?.status)} 
                      size={16} 
                      className={getStatusColor(feature?.status)} 
                    />
                    <Icon 
                      name={activeFeature === feature?.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {feature?.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    feature?.status === 'available' ? 'bg-success/10 text-success' :
                    feature?.status === 'recommended' ? 'bg-warning/10 text-warning' :
                    feature?.status === 'enabled'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {feature?.status?.charAt(0)?.toUpperCase() + feature?.status?.slice(1)}
                  </span>
                </div>
                
                {activeFeature === feature?.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature?.details}
                    </p>
                    
                    <div className="flex space-x-2">
                      {feature?.status === 'available' && (
                        <Button variant="outline" size="sm" iconName="Settings">
                          Enable
                        </Button>
                      )}
                      {feature?.status === 'recommended' && (
                        <Button variant="default" size="sm" iconName="Shield">
                          Set Up Now
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" iconName="ExternalLink">
                        Learn More
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Privacy & Data Protection</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use industry-standard encryption to protect your data. Your personal information is never shared 
              without your consent, and you maintain full control over your privacy settings. All authentication 
              data is encrypted and stored securely according to GDPR and CCPA compliance standards.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
          <Icon name="Lock" size={24} className="text-success mx-auto mb-2" />
          <p className="text-sm font-medium text-success">SSL Encrypted</p>
          <p className="text-xs text-muted-foreground">256-bit encryption</p>
        </div>
        
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <Icon name="Shield" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-primary">SOC 2 Compliant</p>
          <p className="text-xs text-muted-foreground">Enterprise security</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;