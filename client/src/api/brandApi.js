import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export async function runStage(stageName, payload) {
  const { data } = await api.post(`/api/stages/${stageName}`, payload);
  return data;
}

export async function getBrand(id) {
  const { data } = await api.get(`/api/brand/${id}`);
  return data;
}

export async function saveBrand(id, payload) {
  const { data } = await api.put(`/api/brand/${id}`, payload);
  return data;
}