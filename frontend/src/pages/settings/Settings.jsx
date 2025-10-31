 import React, { useState, useEffect } from 'react';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import Icon from '@/Component/AppIcon';
import { authAPI } from '@/utils/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    graduationYear: '',
    major: '',
    currentPosition: '',
    company: ''
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    showActivity: true
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    mentorshipRequests: true,
    connectionRequests: true,
    newsletter: false,
    marketingEmails: false
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'privacy', name: 'Privacy', icon: 'Shield' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' },
    { id: 'security', name: 'Security', icon: 'Lock' }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await authAPI.getUser();
        // User data loaded
        // Initialize form data with user data
        setProfileData({
          name: userData?.user?.name || '',
          email: userData?.user?.email || '',
          bio: userData?.user?.bio || '',
          location: userData?.user?.location || '',
          graduationYear: userData?.user?.graduationYear || '',
          major: userData?.user?.major || '',
          currentPosition: userData?.user?.currentPosition || '',
          company: userData?.user?.company || ''
        });
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await authAPI.updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setSaving(true);
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Privacy settings updated successfully!');
    } catch {
      alert('Failed to update privacy settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setSaving(true);
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Notification settings updated successfully!');
    } catch {
      alert('Failed to update notification settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password changed successfully!');
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      alert('Failed to change password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Location"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  label="Graduation Year"
                  value={profileData.graduationYear}
                  onChange={(e) => setProfileData(prev => ({ ...prev, graduationYear: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Major"
                  value={profileData.major}
                  onChange={(e) => setProfileData(prev => ({ ...prev, major: e.target.value }))}
                />
                <Input
                  label="Current Position"
                  value={profileData.currentPosition}
                  onChange={(e) => setProfileData(prev => ({ ...prev, currentPosition: e.target.value }))}
                />
              </div>

              <Input
                label="Company"
                value={profileData.company}
                onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Privacy Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Profile Visibility</label>
                <div className="space-y-2">
                  {[
                    { value: 'public', label: 'Public - Anyone can see your profile' },
                    { value: 'alumni', label: 'Alumni Only - Only verified alumni can see your profile' },
                    { value: 'connections', label: 'Connections Only - Only your connections can see your profile' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={privacySettings.profileVisibility === option.value}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                        className="text-primary"
                      />
                      <span className="text-sm text-muted-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.showEmail}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground">Show email address on profile</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.showPhone}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showPhone: e.target.checked }))}
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground">Show phone number on profile</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.allowMessaging}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessaging: e.target.checked }))}
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground">Allow messaging from other users</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.showActivity}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showActivity: e.target.checked }))}
                    className="text-primary"
                  />
                  <span className="text-sm text-muted-foreground">Show activity status</span>
                </label>
              </div>

              <div className="flex justify-end">
                <Button onClick={handlePrivacyUpdate} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Email Notifications</span>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="text-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Event Reminders</span>
                    <p className="text-xs text-muted-foreground">Get reminded about upcoming events</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.eventReminders}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, eventReminders: e.target.checked }))}
                    className="text-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Mentorship Requests</span>
                    <p className="text-xs text-muted-foreground">Notifications for new mentorship requests</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.mentorshipRequests}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, mentorshipRequests: e.target.checked }))}
                    className="text-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Connection Requests</span>
                    <p className="text-xs text-muted-foreground">Notifications for new connection requests</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.connectionRequests}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, connectionRequests: e.target.checked }))}
                    className="text-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Newsletter</span>
                    <p className="text-xs text-muted-foreground">Weekly newsletter with alumni updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.newsletter}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, newsletter: e.target.checked }))}
                    className="text-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground">Marketing Emails</span>
                    <p className="text-xs text-muted-foreground">Promotional emails and special offers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.marketingEmails}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                    className="text-primary"
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNotificationUpdate} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
              />

              <Input
                label="New Password"
                type="password"
                value={securityData.newPassword}
                onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={securityData.confirmPassword}
                onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </form>

            <hr className="my-8 border-border" />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-700">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
