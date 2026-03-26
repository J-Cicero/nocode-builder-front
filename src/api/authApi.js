import axios from './axios';

export const authApi = {
  login: async (email, password) => {
    // En production, utiliser une vraie API
    // return axios.post('/auth/login', { email, password });
    return { data: { user: { email }, token: 'mock-token' } };
  },

  register: async (userData) => {
    // En production, utiliser une vraie API
    // return axios.post('/auth/register', userData);
    return { data: { user: userData, token: 'mock-token' } };
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    return { data: { success: true } };
  },

  verifyEmail: async (token) => {
    // return axios.post('/auth/verify-email', { token });
    return { data: { verified: true } };
  },

  resetPassword: async (email) => {
    // return axios.post('/auth/reset-password', { email });
    return { data: { sent: true } };
  },

  changePassword: async (oldPassword, newPassword) => {
    // return axios.post('/auth/change-password', { oldPassword, newPassword });
    return { data: { success: true } };
  }
};

export default authApi;
