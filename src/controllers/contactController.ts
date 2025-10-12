import type { Request, Response } from "express";
import * as service from "../services/contactService.js";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await service.getContacts();
    return res.json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar contatos!" });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e Email são obrigatórios!" });
    }
    const newContact = await service.createContact({ name, email, phone });
    return res.status(201).json(newContact);
  } catch (err: any) {
    console.error(err);

    if (err?.code === "P2002") {
      return res.status(400).json({ error: "Este Email já está cadastrado!" });
    }
    return res.status(500).json({ error: "Erro ao criar contato!" });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updated = await service.updateContact(Number(id), { name, email, phone });
    return res.json(updated);
  } catch (err: any) {
    console.error(err);
    if (err?.code === "P2025") {
      return res.status(404).json({ error: "Contato não encontrado!" });
    }
    return res.status(500).json({ error: "Erro ao atualizar contato!" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await service.deleteContact(Number(id));
    return res.json({ message: "Contato apagado!" });
  } catch (err: any) {
    console.error(err);
    if (err?.code === "P2025") {
      return res.status(404).json({ error: "Contato não encontrado!" });
    }
    return res.status(500).json({ error: "Erro ao apagar contato!" });
  }
};
