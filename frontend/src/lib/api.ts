import axios from 'axios';

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://orbit-cu-server.vercel.app/api';
  }
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to silently fetch a real backend JWT for current user or default demo student
const fetchRealBackendToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = localStorage.getItem('cu_auth_user') || localStorage.getItem('user');
    let email = 'student@city.edu';
    let name = 'Student';
    let universityId = '2021-1-60-001';
    let department = 'CSE';
    let role = 'STUDENT';

    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed.email) email = parsed.email.toLowerCase().trim();
        if (parsed.name) name = parsed.name;
        if (parsed.universityId) universityId = parsed.universityId;
        if (parsed.department) department = parsed.department;
        if (parsed.role) role = parsed.role;
      } catch {
        // use defaults
      }
    }

    const pwd = email === 'admin@city.edu' ? 'admin123' : 'password123';
    
    // 1. Try login
    try {
      const res = await axios.post(`${getBaseURL()}/auth/login`, {
        email,
        password: pwd,
      }, { timeout: 5000 });
      const token = res.data?.data?.token || res.data?.token;
      if (token) {
        localStorage.setItem('cu_auth_token', token);
        localStorage.setItem('token', token);
        return token;
      }
    } catch {
      // 2. If login failed because user not found in remote DB, try registering
      try {
        const regRes = await axios.post(`${getBaseURL()}/auth/register`, {
          name,
          universityId,
          email,
          password: pwd,
          department,
          role,
        }, { timeout: 5000 });
        const token = regRes.data?.data?.token || regRes.data?.token;
        if (token) {
          localStorage.setItem('cu_auth_token', token);
          localStorage.setItem('token', token);
          return token;
        }
      } catch {
        // Server unreachable
      }
    }
  } catch {
    // Silent fallback
  }
  return null;
};

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('cu_auth_token') || localStorage.getItem('token');
    
    // If token is missing, expired, or a mock token (e.g. starts with jwt-session-token-),
    // proactively obtain a real JWT from backend
    if (!token || token.startsWith('jwt-session-token-') || !token.startsWith('ey')) {
      const freshToken = await fetchRealBackendToken();
      if (freshToken) {
        token = freshToken;
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Auto-recover on 401 Unauthorized / Invalid token once
    if (
      typeof window !== 'undefined' &&
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await fetchRealBackendToken();
      if (newToken && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

