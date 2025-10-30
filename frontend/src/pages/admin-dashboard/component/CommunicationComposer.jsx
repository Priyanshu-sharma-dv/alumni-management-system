import React, { useState } from 'react';
import Button from "@/Component/ui/Button";
import Input from "@/Component/ui/Input";


const CommunicationComposer = ({ onSendMessage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageData, setMessageData] = useState({
    subject: '',
    content: '',
    recipients: 'all',
    template: '',
    scheduledTime: ''
  });

  const templates = [
    {
      id: 'welcome',
      name: 'Welcome Message',
      subject: 'Welcome to AlumniConnect Pro!',
      content: `Dear [Name],\n\nWelcome to our alumni community! We're excited to have you join our network of successful graduates.\n\nBest regards,\nAlumni Relations Team`
    },
    {
      id: 'event',name: 'Event Invitation',subject: 'You\'re Invited: [Event Name]',
      content: `Dear [Name],\n\nWe're excited to invite you to our upcoming event: [Event Name]\n\nDate: [Date]\nTime: [Time]\nLocation: [Location]\n\nPlease RSVP by [RSVP Date].\n\nBest regards,\nAlumni Relations Team`
    },
    {
      id: 'donation',name: 'Donation Campaign',subject: 'Support Your Alma Mater - [Campaign Name]',
      content: `Dear [Name],\n\nWe're launching a new campaign to support [Cause]. Your contribution can make a significant impact.\n\nGoal: $[Goal]\nRaised so far: $[Raised]\n\nDonate now: [Link]\n\nThank you for your continued support.\n\nBest regards,\nAlumni Relations Team`
    }
  ];

  const recipientOptions = [
    { value: 'all', label: 'All Alumni', count: 15420 },
    { value: 'active', label: 'Active Users', count: 8934 },
    { value: 'recent', label: 'Recent Graduates', count: 2156 },
    { value: 'donors', label: 'Previous Donors', count: 1847 },
    { value: 'segment', label: 'Custom Segment', count: 0 }
  ];

  const handleTemplateSelect = (template) => {
    setMessageData({
      ...messageData,
      template: template?.id,
      subject: template?.subject,
      content: template?.content
    });
  };

  const handleSend = () => {
    if (messageData?.subject && messageData?.content) {
      onSendMessage({
        ...messageData,
        timestamp: new Date()?.toISOString(),
        status: messageData?.scheduledTime ? 'scheduled' : 'sent'
      });
      setMessageData({
        subject: '',
        content: '',
        recipients: 'all',
        template: '',
        scheduledTime: ''
      });
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Bulk Communication</h3>
          <p className="text-sm text-muted-foreground">Send targeted messages to alumni segments</p>
        </div>
        <Button 
          variant="default" 
          iconName="Mail" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Compose Message
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Quick Templates</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {templates?.map((template) => (
                <button
                  key={template?.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                    messageData?.template === template?.id
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium text-sm text-foreground">{template?.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{template?.subject}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Recipients</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {recipientOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setMessageData({...messageData, recipients: option?.value})}
                  className={`p-3 text-center border rounded-lg transition-colors duration-200 ${
                    messageData?.recipients === option?.value
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium text-sm text-foreground">{option?.label}</div>
                  <div className="text-xs text-muted-foreground">{option?.count?.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <Input
              label="Subject Line"
              type="text"
              placeholder="Enter email subject"
              value={messageData?.subject}
              onChange={(e) => setMessageData({...messageData, subject: e?.target?.value})}
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message Content</label>
              <textarea
                className="w-full h-40 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your message content..."
                value={messageData?.content}
                onChange={(e) => setMessageData({...messageData, content: e?.target?.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Schedule Send (Optional)"
                type="datetime-local"
                value={messageData?.scheduledTime}
                onChange={(e) => setMessageData({...messageData, scheduledTime: e?.target?.value})}
              />
              <div className="flex items-end">
                <Button variant="outline" iconName="TestTube" className="w-full">
                  A/B Test
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" iconName="Save">
                Save Draft
              </Button>
              <Button variant="ghost" iconName="Eye">
                Preview
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button variant="default" iconName="Send" onClick={handleSend}>
                {messageData?.scheduledTime ? 'Schedule' : 'Send Now'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Recent Messages */}
      {!isExpanded && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Recent Communications</h4>
          {[
            {
              id: 1,
              subject: "Welcome to AlumniConnect Pro!",
              recipients: "New Members",
              sent: "2025-09-27",
              status: "delivered",
              openRate: "78%"
            },
            {
              id: 2,
              subject: "Annual Gala 2025 - Save the Date",
              recipients: "All Alumni",
              sent: "2025-09-25",
              status: "delivered",
              openRate: "65%"
            },
            {
              id: 3,
              subject: "Scholarship Fund Campaign Update",
              recipients: "Previous Donors",
              sent: "2025-09-23",
              status: "delivered",
              openRate: "82%"
            }
          ]?.map((message) => (
            <div key={message?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-sm text-foreground">{message?.subject}</div>
                <div className="text-xs text-muted-foreground">
                  To: {message?.recipients} • Sent: {message?.sent}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-success">{message?.openRate}</div>
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunicationComposer;