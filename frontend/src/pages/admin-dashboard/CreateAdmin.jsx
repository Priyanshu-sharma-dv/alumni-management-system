import React, { useState } from 'react';
import Header from '@/Component/ui/Header';
import Input from '@/Component/ui/Input';
import Button from '@/Component/ui/Button';
import { authAPI } from '@/utils/api';

const CreateAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', college_name: '', college_code: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('password', form.password);
      fd.append('role', 'admin');
      fd.append('college_name', form.college_name);
      fd.append('college_code', form.college_code);
      const res = await authAPI.register(fd);
      setSuccess('Admin account created successfully');
    } catch (err) {
      setError(err.message || 'Failed to create admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">Create Admin Account</h1>
        <p className="text-sm text-muted-foreground mb-6">College staff only. Requires an invite code.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input label="Full Name" name="name" value={form.name} onChange={onChange} required />
          <Input label="Email" type="email" name="email" value={form.email} onChange={onChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={onChange} required />
          <Input label="College Name" name="college_name" value={form.college_name} onChange={onChange} required />
          <Input label="College Code" name="college_code" value={form.college_code} onChange={onChange} required />
          {error && <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
          {success && <div className="p-2 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>}
          <Button type="submit" loading={isLoading} disabled={isLoading} fullWidth>Create Admin</Button>
        </form>
      </main>
    </div>
  );
};

export default CreateAdmin;


