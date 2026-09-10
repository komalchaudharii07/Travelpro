import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach JWT token to requests if it exists in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export const fetchLocations = async () => {
  try {
    const response = await API.get("/locations"); // Match this to your backend route path
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

// Add or check this inside your frontend api.js file
export const fetchLocationById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/locations/${id}`);
    if (!response.ok) throw new Error("Failed to fetch location tour");
    return await response.json();
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    return null;
  }
};
export default API;