import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

// automatically attach JWT token if present
api.interceptors.request.use(config => {
    const token = localStorage.getItem('innerRootToken');

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// simple response interceptor to clear token on unauthorized
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('innerRootToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getWisdomQuotes = () => api.get('/wisdom');
export const getCultureItems = () => api.get('/culture');
export const getHeritageSites = () => api.get('/heritage-sites');
export const getLibraryItems = () => api.get('/library');
export const getCommunityPosts = () => api.get('/community/posts');
export const createPost = (post) => api.post('/community/posts', post);
export const likePost = (id) => api.post(`/community/posts/${id}/like`);
export const getGuides = () => api.get('/guides');
export const getEvents = () => api.get('/events');

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }).then(res => res.data),
    register: (name, email, password, onboardingData) => api.post('/auth/register', { name, email, password, ...onboardingData }).then(res => res.data),
    getMe: () => api.get('/auth/me').then(res => res.data),
    googleAuth: (accessToken) => api.post('/auth/google', { accessToken }).then(res => res.data),
};

export const communityAPI = {
    getPosts: () => api.get('/community/posts').then(res => res.data),
    createPost: (title, content) => api.post('/community/posts', { title, content }).then(res => res.data),
    likePost: (id) => api.post(`/community/posts/${id}/like`).then(res => res.data),
};

export const wisdomAPI = {
    getAll: () => api.get('/wisdom').then(res => res.data),
    getRandom: () => api.get('/wisdom/random').then(res => res.data),
};

export const cultureAPI = {
    getAll: () => api.get('/culture').then(res => res.data),
};

export const heritageAPI = {
    getAll: () => api.get('/heritage-sites').then(res => res.data),
};

export const libraryAPI = {
    getAll: () => api.get('/library').then(res => res.data),
};

export const eventAPI = {
    getAll: () => api.get('/events').then(res => res.data),
};

export const moodAPI = {
    getAll: () => api.get('/mood').then(res => res.data),
    save: (moodData) => api.post('/mood', moodData).then(res => res.data),
};

export default api;
