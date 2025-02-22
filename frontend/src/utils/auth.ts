import axios from 'axios';

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const setupAxiosAuth = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};