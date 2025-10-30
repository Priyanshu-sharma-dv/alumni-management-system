import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import { authAPI } from '@/utils/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    company: '',
    location: '',
    graduationYear: '',
    bio: '',
    linkedin: '',
    website: '',
    profileImage: null
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const toCamelUser = (raw) => {
    if (!raw) return null;
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
      // backend returns filename; serve via /uploads
      profileImage: raw.profile_image ? `/uploads/${raw.profile_image}` : raw.profileImage || null,
      title: raw.title || '',
      company: raw.company || '',
      location: raw.location || '',
      graduationYear: raw.graduationYear || raw.graduation_year || '',
      bio: raw.bio || '',
      linkedin: raw.linkedin || '',
      website: raw.website || ''
    };
  };

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login-portal');
        return;
      }

      const resp = await authAPI.getUser();
      const u = toCamelUser(resp.user || resp);
      setUser(u);
      setFormData({
        name: u.name || '',
        email: u.email || '',
        title: u.title || '',
        company: u.company || '',
        location: u.location || '',
        graduationYear: u.graduationYear || '',
        bio: u.bio || '',
        linkedin: u.linkedin || '',
        website: u.website || '',
        profileImage: null
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setError('Failed to load profile data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('title', formData.title);
      fd.append('company', formData.company);
      fd.append('location', formData.location);
      fd.append('graduationYear', formData.graduationYear);
      fd.append('bio', formData.bio);
      fd.append('linkedin', formData.linkedin);
      fd.append('website', formData.website);

      if (formData.profileImage) {
        fd.append('profileImage', formData.profileImage);
      }

      await authAPI.updateProfile(fd);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      loadUserProfile(); // Reload to get updated data
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    loadUserProfile(); // Reset form data
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image 
                  src={user.profileImage || '/api/placeholder/80/80'} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.title ? `${user.title} at ${user.company || ''}` : ''}</p>
                <p className="text-xs text-muted-foreground mt-1">Role: {user.role}</p>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    loading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} className="text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={20} className="text-green-600 mr-2" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.name || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                  {isEditing ? (
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your job title"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.title || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  {isEditing ? (
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.company || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.location || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Graduation Year</label>
                  {isEditing ? (
                    <Input
                      name="graduationYear"
                      type="number"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      placeholder="Enter graduation year"
                    />
                  ) : (
                    <p className="text-muted-foreground">{user.graduationYear || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  className="w-full p-3 border border-border rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-muted-foreground">{user.bio || 'No bio provided'}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                  {isEditing ? (
                    <Input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  ) : (
                    user.linkedin ? (
                      <a className="text-primary underline" href={user.linkedin} target="_blank" rel="noreferrer">{user.linkedin}</a>
                    ) : (
                      <p className="text-muted-foreground">Not provided</p>
                    )
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Personal/Social Link</label>
                  {isEditing ? (
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com or social link"
                    />
                  ) : (
                    user.website ? (
                      <a className="text-primary underline" href={user.website} target="_blank" rel="noreferrer">{user.website}</a>
                    ) : (
                      <p className="text-muted-foreground">Not provided</p>
                    )
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="mt-4 text-right">
                  <Button onClick={handleSave} loading={isLoading}>Save</Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h2>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image 
                    src={user.profileImage || '/api/placeholder/128/128'} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profile-image-upload"
                    />
                    <label htmlFor="profile-image-upload">
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Change Photo
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connections</span>
                  <span className="font-medium text-foreground">{user.connections || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mentorship Sessions</span>
                  <span className="font-medium text-foreground">{user.mentorshipSessions || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Events Attended</span>
                  <span className="font-medium text-foreground">{user.eventsAttended || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Impact Score</span>
                  <span className="font-medium text-foreground">{user.impactScore || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
