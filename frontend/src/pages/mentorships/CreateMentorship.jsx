import React, { useState } from 'react';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import { adminAPI } from '@/utils/api';

const CreateMentorship = () => {
  const [form, setForm] = useState({ mentorName: '', title: '', expertise: '', capacity: 1, bio: '', location: 'Remote', isRemote: true });
  const [status, setStatus] = useState('');

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const payload = { ...form, expertise: form.expertise ? form.expertise.split(',').map(s => s.trim()) : [] };
      const created = await adminAPI.createMentorship(payload);
      setStatus(`Created mentorship #${created.id}`);
    } catch (err) {
      setStatus(err.message || 'Failed to create mentorship');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Mentorship</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Mentor Name" name="mentorName" value={form.mentorName} onChange={update} required />
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Input label="Expertise (comma-separated)" name="expertise" value={form.expertise} onChange={update} />
        <Input label="Capacity" name="capacity" type="number" value={form.capacity} onChange={update} />
        <Input label="Location" name="location" value={form.location} onChange={update} />
        <div className="flex items-center space-x-2">
          <input id="isRemote" type="checkbox" name="isRemote" checked={form.isRemote} onChange={update} />
          <label htmlFor="isRemote">Remote</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea name="bio" value={form.bio} onChange={update} className="w-full border rounded-md p-2" rows={4} />
        </div>
        <Button type="submit">Create Mentorship</Button>
      </form>
      {status && <p className="mt-3 text-sm text-muted-foreground">{status}</p>}
    </div>
  );
};

export default CreateMentorship;


