import { api } from "./api";

export const getContacts = () => api.get("/contacts");

export const createContact = (data: { name: string; email: string; phone?: string }) =>
  api.post("/contacts", data);

export const updateContact = (id: number, data: { name: string; email: string; phone?: string }) =>
  api.put(`/contacts/${id}`, data);

export const deleteContact = (id: number) =>
  api.delete(`/contacts/${id}`);
