import React, { useState } from 'react';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import { adminAPI } from '@/utils/api';

const CreateEvent = () => {
  const [form, setForm] = useState({ title: '', type: 'networking', date: '', location: '', isVirtual: false, capacity: 100, price: 0, description: '' });
  const [banner, setBanner] = useState(null);
  const [status, setStatus] = useState('');

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (banner) fd.append('banner', banner);
      const created = await adminAPI.createEvent(fd);
      setStatus(`Created event #${created.id}`);
    } catch (err) {
      setStatus(err.message || 'Failed to create event');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Input label="Type" name="type" value={form.type} onChange={update} />
        <Input label="Date" name="date" type="datetime-local" value={form.date} onChange={update} required />
        <Input label="Location" name="location" value={form.location} onChange={update} required />
        <div className="flex items-center space-x-2">
          <input id="isVirtual" type="checkbox" name="isVirtual" checked={form.isVirtual} onChange={update} />
          <label htmlFor="isVirtual">Virtual event</label>
        </div>
        <Input label="Capacity" name="capacity" type="number" value={form.capacity} onChange={update} />
        <Input label="Price" name="price" type="number" value={form.price} onChange={update} />
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={update} className="w-full border rounded-md p-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Banner</label>
          <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files?.[0] || null)} />
        </div>
        <Button type="submit">Create Event</Button>
      </form>
      {status && <p className="mt-3 text-sm text-muted-foreground">{status}</p>}
    </div>
  );
};

export default CreateEvent;


