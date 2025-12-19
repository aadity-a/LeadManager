import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Mock data for development
const mockProjects = [
    { id: 1, name: 'EcoTracker', description: 'A mobile app to track personal carbon footprint.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'FinTech Dashboard', description: 'Comprehensive financial analytics platform for businesses.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'HealthConnect', description: 'Telemedicine solution connecting patients with doctors.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' }
];

const mockClients = [
    { id: 1, name: 'John Doe', designation: 'CEO, TechCorp', description: 'Outstanding service and incredible results.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Sarah Smith', designation: 'Product Manager', description: 'The team was professional and delivered on time.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
];

let mockContacts = [];
let mockSubscribers = [];

const useMock = false; // Toggle this to false when backend is ready

export const api = {
    fetchProjects: async () => {
        if (useMock) return Promise.resolve(mockProjects);
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    },

    fetchClients: async () => {
        if (useMock) return Promise.resolve(mockClients);
        const response = await axios.get(`${API_URL}/clients`);
        return response.data;
    },

    submitContact: async (data) => {
        if (useMock) {
            mockContacts.push(data);
            console.log('Contact submitted:', data);
            return Promise.resolve({ success: true });
        }
        return axios.post(`${API_URL}/contact`, data);
    },

    subscribe: async (email) => {
        if (useMock) {
            mockSubscribers.push(email);
            console.log('Subscribed:', email);
            return Promise.resolve({ success: true });
        }
        return axios.post(`${API_URL}/subscribe`, { email });
    },

    // Admin functions
    addProject: async (project) => {
        if (useMock) {
            const newProject = { ...project, id: Date.now() };
            mockProjects.push(newProject);
            return Promise.resolve(newProject);
        }
        return axios.post(`${API_URL}/projects`, project);
    },

    addClient: async (client) => {
        if (useMock) {
            const newClient = { ...client, id: Date.now() };
            mockClients.push(newClient);
            return Promise.resolve(newClient);
        }
        return axios.post(`${API_URL}/clients`, client);
    },

    fetchContacts: async () => {
        if (useMock) return Promise.resolve(mockContacts);
        const response = await axios.get(`${API_URL}/contact`);
        return response.data;
    },

    fetchSubscribers: async () => {
        if (useMock) return Promise.resolve(mockSubscribers);
        const response = await axios.get(`${API_URL}/subscribe`);
        return response.data;
    }
};
