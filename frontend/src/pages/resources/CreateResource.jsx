import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/Component/ui/Header';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import Icon from '@/Component/AppIcon';
import { resourcesAPI } from '@/utils/api';

const CreateResource = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'career',
    type: 'article',
    tags: '',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'career', label: 'Career Development' },
    { value: 'networking', label: 'Networking' },
    { value: 'skills', label: 'Skill Building' },
    { value: 'alumni', label: 'Alumni Stories' },
    { value: 'tools', label: 'Tools & Templates' }
  ];

  const types = [
    { value: 'article', label: 'Article' },
    { value: 'download', label: 'Downloadable File' },
    { value: 'video', label: 'Video Link' },
    { value: 'link', label: 'External Link' }
  ];

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      updateForm('file', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!form.title.trim() || !form.description.trim()) {
        throw new Error('Title and description are required');
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('description', form.description.trim());
      formData.append('category', form.category);
      formData.append('type', form.type);
      formData.append('tags', form.tags);

      if (form.file) {
        formData.append('file', form.file);
      }

      // Submit to API (for now, just show success message)
      await resourcesAPI.create(formData);

      alert('Resource submitted successfully! It will be reviewed by our team before being published.');
      navigate('/resources');
    } catch (err) {
      setError(err.message || 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Resource</h1>
            <p className="text-muted-foreground mt-2">
              Share valuable resources with the alumni community.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/resources')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Resources
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title *
            </label>
            <Input
              type="text"
              placeholder="Enter resource title"
              value={form.title}
              onChange={(e) => updateForm('title', e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              rows={4}
              placeholder="Describe what this resource offers and who it benefits..."
              value={form.description}
              onChange={(e) => updateForm('description', e.target.value)}
              required
            />
          </div>

          {/* Category and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.category}
                onChange={(e) => updateForm('category', e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Type *
              </label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.type}
                onChange={(e) => updateForm('type', e.target.value)}
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags (optional)
            </label>
            <Input
              type="text"
              placeholder="Enter tags separated by commas (e.g., resume, career, job search)"
              value={form.tags}
              onChange={(e) => updateForm('tags', e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* File Upload */}
          {(form.type === 'download' || form.type === 'video') && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {form.type === 'download' ? 'Upload File' : 'Video/File Upload'}
              </label>
              <input
                type="file"
                accept={form.type === 'video' ? 'video/*,.mp4,.mov,.avi' : '*'}
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {form.file && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {form.file.name} ({(form.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={16} className="text-red-600 mr-2" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/resources')}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Submit Resource
            </Button>
          </div>
        </form>

        {/* Guidelines */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Submission Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Resources should be valuable and relevant to the alumni community</li>
            <li>• Ensure you have permission to share any files or content</li>
            <li>• File uploads are limited to 10MB</li>
            <li>• All submissions are reviewed by our team before publication</li>
            <li>• You will be notified once your resource is approved</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CreateResource;
