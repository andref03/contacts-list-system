import { api } from './api';

export const getContacts = (params?: {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) => api.get('/contacts', { params });

export const createContact = (data: { name: string; email: string; phone?: string }) =>
  api.post('/contacts', data);

export const updateContact = (id: number, data: { name: string; email: string; phone?: string }) =>
  api.put(`/contacts/${id}`, data);

export const deleteContact = (id: number) => api.delete(`/contacts/${id}`);

export const getContactById = (id: number) => api.get(`/contacts/${id}`);
