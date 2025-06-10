import axios from 'axios';
import API_BASE_URL from '../config';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

api.interceptors.request.use((config) => {
  const token = getCookie('csrftoken');
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          localStorage.setItem('access', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Erro ao renovar token:', refreshError);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const fetchQuizzes = async () => {
  const response = await fetch(`${API_BASE_URL}/quizzes/`);
  return response.json();
};

export const fetchQuiz = async (quizId) => {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/`);
  return response.json();
};

export const submitAnswer = async (quizId, answer) => {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer }),
  });
  return response.json();
};

export function getCsrfToken() {
  const token = getCookie('csrftoken');
  if (!token) {
    axios.get(`${API_BASE_URL}/csrf/`).then(response => {
      document.cookie = `csrftoken=${response.data.csrfToken}`;
    });
  }
}

export default api;

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}