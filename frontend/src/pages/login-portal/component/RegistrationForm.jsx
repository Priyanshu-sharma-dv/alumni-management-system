import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/Component/AppIcon';
import Button from '@/Component/ui/Button';
import Input from '@/Component/ui/Input';
import Select from '@/Component/ui/Select';
import { Checkbox } from '@/Component/ui/Checkbox';
import { authAPI } from '@/utils/api';

const RegistrationForm = ({ selectedRole, className = '' }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    // For alumni
    graduationYear: '',
    major: '',
    currentPosition: '',
    company: '',
    // For students  
    studentId: '',
    department: '',
    interests: [],
    privacySettings: 'public',
    notifications: { email: true, sms: false, push: true },
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // 🔹 Register submit
  async function submitRegister(e) {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsLoading(true);
    setError('');

    try {
      console.log('Preparing registration data...');
      console.log('Form data:', { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, role: selectedRole });
      
      const fd = new FormData();
      fd.append('name', `${formData.firstName} ${formData.lastName}`);
      fd.append('email', formData.email);
      fd.append('password', formData.password);
      fd.append('role', selectedRole || 'alumni');

      // Add profile image if provided
      if (formData.profileImage) {
        console.log('Adding profile image to form data');
        fd.append('profileImage', formData.profileImage);
      }

      console.log('Sending registration request...');
      const data = await authAPI.register(fd);
      console.log('Registration successful:', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token saved, redirecting to dashboard...');
        navigate(`/${selectedRole}-dashboard`);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Network error - Please check your backend server is running');
    } finally {
      setIsLoading(false);
    }
  }

  // 🔹 Input handlers, validation, etc.
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (!name) return;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'password') calculatePasswordStrength(value);
  };

  const calculatePasswordStrength = (password) => {
    let s = 0;
    if (password.length >= 8) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (/[^A-Za-z0-9]/.test(password)) s += 25;
    setPasswordStrength(s);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    // Step 1: Basic Info
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name required';
      if (!formData.lastName) newErrors.lastName = 'Last name required';
      if (!formData.email) newErrors.email = 'Email required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.password) newErrors.password = 'Password required';
      else if (formData.password.length < 8) newErrors.password = 'Min 8 chars';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Step 2: Role-specific info
    if (step === 2 && (selectedRole === 'alumni' || !selectedRole)) {
      if (selectedRole === 'alumni') {
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year required';
        if (!formData.major) newErrors.major = 'Major required';
      }
    }
    
    // Step 3: Terms & Privacy
    if (step === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Accept terms';
      if (!formData.privacyAccepted) newErrors.privacyAccepted = 'Accept privacy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(p => p + 1); };
  const handlePrevious = () => setCurrentStep(p => p - 1);
  const getRoleDisplayName = () => ({ alumni: 'Alumni', student: 'Student', admin: 'Staff' }[selectedRole] || 'User');

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p>Join as {getRoleDisplayName()} - Step {currentStep} of 3</p>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }} />
      </div>

      <form onSubmit={submitRegister} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                error={errors.lastName}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={errors.email}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-muted-foreground"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              error={errors.confirmPassword}
            />

            {formData.password && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Password Strength: {getPasswordStrengthText()}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Additional Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {/* Alumni/Student specific fields */}
            {(selectedRole === 'alumni' || !selectedRole) && (
              <>
                <Input
                  label="Graduation Year"
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                  error={errors.graduationYear}
                />
                <Input
                  label="Major/Degree"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  error={errors.major}
                />
                <Input
                  label="Current Position"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Engineer"
                />
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Google, Microsoft"
                />
              </>
            )}

            {selectedRole === 'student' && (
              <>
                <Input
                  label="Student ID"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                />
                <Input
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Your department"
                />
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Profile Picture (Optional)</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.files?.[0] }))}
                className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              />
            </div>
          </div>
        )}

        {/* Step 3: Terms & Privacy */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Checkbox
                label="I accept the Terms of Service"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                error={errors.termsAccepted}
              />
              <Checkbox
                label="I accept the Privacy Policy"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleInputChange}
                error={errors.privacyAccepted}
              />
              <Checkbox
                label="I would like to receive marketing emails"
                name="marketingOptIn"
                checked={formData.marketingOptIn}
                onChange={handleInputChange}
              />
            </div>

            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                By creating an account, you agree to connect with alumni and contribute to the community. 
                Your profile information will be shared according to your privacy settings.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={isLoading}>
              Previous
            </Button>
          )}
          <div className={currentStep === 1 ? "ml-auto" : ""}>
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNext} disabled={isLoading}>
                Next
              </Button>
            ) : (
              <Button type="submit" loading={isLoading} disabled={isLoading}>
                Create Account
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
