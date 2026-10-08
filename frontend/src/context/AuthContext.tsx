'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import api from '@/lib/api';

export interface AuthContextType {
  user: User | null;
  token?: string | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  updateUserRole: (userId: string, newRole: UserRole, assignedClub?: string) => void;
  allUsers: User[]; // In-memory & synced list for Admin Console demo
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Demo Seed Users
export const INITIAL_DEMO_USERS: User[] = [
  {
    _id: 'usr_student_1',
    name: 'Tanvir Ahmed',
    universityId: '2021-1-60-001',
    email: 'student@city.edu',
    department: 'CSE',
    role: 'STUDENT',
    clubMemberships: ['CU Computer Club (CUCC)', 'CU Debating Society (CUDS)'],
  },
  {
    _id: 'usr_student_2',
    name: 'Farhana Akter',
    universityId: '2022-2-60-109',
    email: 'farhana@city.edu',
    department: 'CSE',
    role: 'STUDENT',
    clubMemberships: ['CU Computer Club (CUCC)'],
  },
  {
    _id: 'usr_club_admin',
    name: 'Nusrat Jahan',
    universityId: '2020-2-50-012',
    email: 'club@city.edu',
    department: 'BBA',
    role: 'CLUB_ADMIN',
    clubMemberships: ['CU Computer Club (CUCC)'],
    adminOfClub: 'CU Computer Club (CUCC)',
  },
  {
    _id: 'usr_super_admin',
    name: 'Prof. Dr. M. Rahman',
    universityId: 'ADMIN-001',
    email: 'admin@city.edu',
    department: 'CSE',
    role: 'UNIVERSITY_ADMIN',
    clubMemberships: [],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_DEMO_USERS);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cu_auth_user') || localStorage.getItem('user');
      let parsedUser: User | null = null;
      if (storedUser) {
        parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }

      const storedToken = localStorage.getItem('cu_auth_token') || localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

      const storedAllUsers = localStorage.getItem('cu_all_users');
      if (storedAllUsers) {
        const parsedAll = JSON.parse(storedAllUsers);
        if (Array.isArray(parsedAll) && parsedAll.length > 0) {
          setAllUsers(parsedAll);
        }
      } else {
        localStorage.setItem('cu_all_users', JSON.stringify(INITIAL_DEMO_USERS));
      }

      // If stored token is a mock token (e.g. starts with jwt-session-token-) or invalid,
      // silently upgrade to a real JWT from backend
      if (parsedUser && (!storedToken || storedToken.startsWith('jwt-session-token-') || !storedToken.startsWith('ey'))) {
        const cleanEmail = parsedUser.email.toLowerCase().trim();
        const pwd = cleanEmail === 'admin@city.edu' ? 'admin123' : 'password123';
        api.post('/auth/login', { email: cleanEmail, password: pwd })
          .then((res) => {
            const realToken = res.data?.data?.token || res.data?.token;
            if (realToken) {
              setToken(realToken);
              localStorage.setItem('cu_auth_token', realToken);
              localStorage.setItem('token', realToken);
            }
          })
          .catch(() => {});
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const login = async (email: string, _password?: string) => {
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const currentUsers = allUsers.length > 0 ? allUsers : INITIAL_DEMO_USERS;
      const found = currentUsers.find((u) => u.email.toLowerCase() === cleanEmail) || {
        _id: `usr_${Date.now()}`,
        name: cleanEmail.split('@')[0],
        universityId: '2023-1-60-999',
        email: cleanEmail,
        department: 'CSE' as const,
        role: 'STUDENT' as const,
        clubMemberships: ['CU Computer Club (CUCC)'],
      };

      const defaultPassword = cleanEmail === 'admin@city.edu' ? 'admin123' : 'password123';
      const passwordToSend = _password && _password !== 'demo12345' ? _password : defaultPassword;

      let sessionToken = 'jwt-session-token-' + Date.now();
      try {
        // Try real backend authentication
        const res = await api.post('/auth/login', {
          email: cleanEmail,
          password: passwordToSend,
        });
        const backendToken = res.data?.data?.token || res.data?.token;
        const backendUser = res.data?.data?.user || res.data?.user;
        if (backendToken) {
          sessionToken = backendToken;
        }
        if (backendUser) {
          if (backendUser._id) found._id = backendUser._id;
          if (backendUser.role) found.role = backendUser.role;
        }
      } catch {
        // If login failed because user not found in remote DB, try registering them!
        try {
          const regRes = await api.post('/auth/register', {
            name: found.name,
            universityId: found.universityId,
            email: found.email,
            password: passwordToSend,
            department: found.department,
            role: found.role,
          });
          const backendToken = regRes.data?.data?.token || regRes.data?.token;
          if (backendToken) {
            sessionToken = backendToken;
          }
        } catch {
          // Server offline or user in demo/mock mode; fallback cleanly to local demo session
        }
      }

      setUser(found);
      setToken(sessionToken);

      try {
        localStorage.setItem('cu_auth_user', JSON.stringify(found));
        localStorage.setItem('user', JSON.stringify(found));
        localStorage.setItem('cu_auth_token', sessionToken);
        localStorage.setItem('token', sessionToken);
      } catch {
        // Storage write failed
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    setLoading(true);
    try {
      const cleanEmail = (userData.email || 'new@city.edu').toLowerCase().trim();
      const pwd = userData.password || 'password123';
      const newUser: User = {
        _id: `usr_${Date.now()}`,
        name: userData.name || 'New Student',
        universityId: userData.universityId || '2024-1-60-000',
        email: cleanEmail,
        department: userData.department || 'CSE',
        role: userData.role || 'STUDENT',
        clubMemberships: userData.clubMemberships || [],
        adminOfClub: userData.adminOfClub || null,
      };

      let sessionToken = 'jwt-session-token-' + Date.now();
      try {
        const regRes = await api.post('/auth/register', {
          name: newUser.name,
          universityId: newUser.universityId,
          email: newUser.email,
          password: pwd,
          department: newUser.department,
          role: newUser.role,
        });
        const backendToken = regRes.data?.data?.token || regRes.data?.token;
        const backendUser = regRes.data?.data?.user || regRes.data?.user;
        if (backendToken) {
          sessionToken = backendToken;
        }
        if (backendUser?._id) {
          newUser._id = backendUser._id;
        }
      } catch {
        // If user already registered, try logging in
        try {
          const logRes = await api.post('/auth/login', {
            email: newUser.email,
            password: pwd,
          });
          const backendToken = logRes.data?.data?.token || logRes.data?.token;
          if (backendToken) {
            sessionToken = backendToken;
          }
        } catch {
          // Fallback cleanly
        }
      }

      const updatedUsers = [...allUsers, newUser];
      setAllUsers(updatedUsers);
      setUser(newUser);
      setToken(sessionToken);

      try {
        localStorage.setItem('cu_all_users', JSON.stringify(updatedUsers));
        localStorage.setItem('cu_auth_user', JSON.stringify(newUser));
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('cu_auth_token', sessionToken);
        localStorage.setItem('token', sessionToken);
      } catch {
        // Storage write failed
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = (userId: string, newRole: UserRole, assignedClub?: string) => {
    const updatedUsers = allUsers.map((u) =>
      u._id === userId
        ? {
            ...u,
            role: newRole,
            adminOfClub: newRole === 'CLUB_ADMIN' ? assignedClub || u.adminOfClub || 'CU Computer Club (CUCC)' : null,
          }
        : u
    );

    setAllUsers(updatedUsers);
    try {
      localStorage.setItem('cu_all_users', JSON.stringify(updatedUsers));
    } catch {
      // Storage write failed
    }

    if (user && user._id === userId) {
      const updatedUser = {
        ...user,
        role: newRole,
        adminOfClub: newRole === 'CLUB_ADMIN' ? assignedClub || user.adminOfClub || 'CU Computer Club (CUCC)' : null,
      };
      setUser(updatedUser);
      try {
        localStorage.setItem('cu_auth_user', JSON.stringify(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch {
        // Storage write failed
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('cu_auth_user');
      localStorage.removeItem('user');
      localStorage.removeItem('cu_auth_token');
      localStorage.removeItem('token');
    } catch {
      // Storage remove failed
    }
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register,
        updateUserRole,
        allUsers,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
