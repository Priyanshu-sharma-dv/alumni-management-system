/**
 * Centralized API utility for backend communication
 */

// Use same-origin + Vite proxy by default; override via VITE_API_URL when deploying
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && typeof import.meta.env.VITE_API_URL !== 'undefined')
  ? import.meta.env.VITE_API_URL
  : '';

/**
 * Default headers for API requests
 */
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

/**
 * Get authentication headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  // Only include Authorization here; Content-Type is decided per request
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch wrapper with error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Don't override Content-Type if FormData is being used
  const isFormData = options.body instanceof FormData;
  
  // For FormData, don't set Content-Type - let browser set it with boundary
  // For other requests, include default headers
  const headers = isFormData 
    ? { ...(options.headers || {}) } // For FormData, do NOT set Content-Type
    : { ...getDefaultHeaders(), ...(options.headers || {}) };

  const config = {
    ...options,
    headers,
  };

  try {
    console.log('Sending request to:', url, { method: config.method, hasBody: !!config.body });
    const response = await fetch(url, config);
    
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse JSON response:', jsonError);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      console.error('Request failed:', response.status, data);
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Auth API functions
 */
export const authAPI = {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object, token: string}>}
   */
  login: async (email, password) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register new user
   * @param {FormData} formData
   * @returns {Promise<{user: object, token: string}>}
   */
  register: async (formData) => {
    // FormData will automatically set Content-Type with boundary
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Get current user profile
   * @returns {Promise<{user: object}>}
   */
  getCurrentUser: async () => {
    return apiRequest('/api/auth/me', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },

  /**
   * Get user profile (alias for getCurrentUser)
   * @returns {Promise<{user: object}>}
   */
  getUser: async () => {
    return apiRequest('/api/auth/user', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },

  /**
   * Update user profile
   * @param {FormData} formData
   * @returns {Promise<{user: object}>}
   */
  updateProfile: async (formData) => {
    return apiRequest('/api/auth/profile', {
      method: 'PUT',
      body: formData,
      headers: getAuthHeaders(),
    });
  },
};

/**
 * Alumni API functions
 */
export const alumniAPI = {
  /**
   * Get all alumni
   * @returns {Promise<Array>}
   */
  getAll: async () => {
    return apiRequest('/api/alumni', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },

  /**
   * Get alumni by ID
   * @param {string} id
   * @returns {Promise<object>}
   */
  getById: async (id) => {
    return apiRequest(`/api/alumni/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
};

// Student APIs
export const studentAPI = {
  getOpportunities: async () => apiRequest('/api/student/opportunities', { method: 'GET', headers: getAuthHeaders() }),
  applyOpportunity: async (id) => apiRequest(`/api/student/opportunities/${id}/apply`, { method: 'POST', headers: getAuthHeaders() }),
  saveOpportunity: async (id) => apiRequest(`/api/student/opportunities/${id}/save`, { method: 'POST', headers: getAuthHeaders() }),

  getPathwaysProgress: async () => apiRequest('/api/student/pathways/progress', { method: 'GET', headers: getAuthHeaders() }),
  incrementPathwayProgress: async (id) => apiRequest(`/api/student/pathways/${id}/progress`, { method: 'POST', headers: getAuthHeaders() }),

  getAssessments: async () => apiRequest('/api/student/assessments', { method: 'GET', headers: getAuthHeaders() }),
  startAssessment: async (id) => apiRequest(`/api/student/assessments/${id}/start`, { method: 'POST', headers: getAuthHeaders() }),

  getMentors: async () => apiRequest('/api/student/mentors', { method: 'GET', headers: getAuthHeaders() }),
  connectMentor: async (id) => apiRequest(`/api/student/mentors/${id}/connect`, { method: 'POST', headers: getAuthHeaders() }),

  getEvents: async () => apiRequest('/api/student/events', { method: 'GET', headers: getAuthHeaders() }),
  registerEvent: async (id) => apiRequest(`/api/student/events/${id}/register`, { method: 'POST', headers: getAuthHeaders() }),

  uploadResume: async (file) => {
    const fd = new FormData();
    fd.append('resume', file);
    return apiRequest('/api/student/resume', { method: 'POST', body: fd });
  },
};

// Event & Mentorship creation APIs
export const adminAPI = {
  createEvent: async (formData) => {
    // formData: FormData including optional 'banner' file
    return apiRequest('/api/events', { method: 'POST', body: formData });
  },
  createMentorship: async (payload) => {
    return apiRequest('/api/mentorships', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
};

// Alumni Dashboard APIs
export const alumniDashboardAPI = {
  getProfile: async () => apiRequest('/api/alumni-dashboard/profile', { method: 'GET', headers: getAuthHeaders() }),
  updateProfile: async (formData) => apiRequest('/api/alumni-dashboard/profile', { method: 'PUT', body: formData }),
  getStats: async () => apiRequest('/api/alumni-dashboard/stats', { method: 'GET', headers: getAuthHeaders() }),
  getActivities: async () => apiRequest('/api/alumni-dashboard/activities', { method: 'GET', headers: getAuthHeaders() }),
  getMentorshipRequests: async () => apiRequest('/api/alumni-dashboard/mentorship-requests', { method: 'GET', headers: getAuthHeaders() }),
  respondToMentorshipRequest: async (id, response) => apiRequest(`/api/alumni-dashboard/mentorship-requests/${id}/respond`, { method: 'POST', body: JSON.stringify({ response }), headers: getAuthHeaders() }),
  getEvents: async () => apiRequest('/api/alumni-dashboard/events', { method: 'GET', headers: getAuthHeaders() }),
  registerForEvent: async (id) => apiRequest(`/api/alumni-dashboard/events/${id}/register`, { method: 'POST', headers: getAuthHeaders() }),
  getDonationData: async () => apiRequest('/api/alumni-dashboard/donations', { method: 'GET', headers: getAuthHeaders() }),
  getNetworkingSuggestions: async () => apiRequest('/api/alumni-dashboard/networking-suggestions', { method: 'GET', headers: getAuthHeaders() }),
  getAchievements: async () => apiRequest('/api/alumni-dashboard/achievements', { method: 'GET', headers: getAuthHeaders() }),
  performQuickAction: async (actionId) => apiRequest('/api/alumni-dashboard/quick-action', { method: 'POST', body: JSON.stringify({ actionId }), headers: getAuthHeaders() }),
};

/**
 * Generic API helper
 */
export default {
  request: apiRequest,
  auth: authAPI,
  alumni: alumniAPI,
  student: studentAPI,
  admin: adminAPI,
  getAuthHeaders,
};

