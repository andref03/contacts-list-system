import type { Request, Response } from "express";
import * as service from "../services/contactService.js";
import { formatDateToBR } from "../utils/date.js";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { q, page = '1', pageSize = '10', sort, order } = req.query as Record<string, string>;
    const p = Number(page) || 1;
    const ps = Number(pageSize) || 10;
  const result = await service.getContacts({ q: q as any, page: p, pageSize: ps, sort: sort as any, order: order as any } as any);

    const formatted = result.data.map((c: any) => ({
      ...c,
      createdAt: formatDateToBR(new Date(c.createdAt)),
      updatedAt: formatDateToBR(new Date(c.updatedAt)),
    }));

    return res.json({ data: formatted, page: result.page, pageSize: result.pageSize, total: result.total });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar contatos!" });
  }
};
export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await service.getContactById(Number(id));
    if (!contact) {
      return res.status(404).json({ error: "Contato não encontrado!" });
    }

    const formattedContact = {
      ...contact,
      createdAt: formatDateToBR(new Date(contact.createdAt)),
      updatedAt: formatDateToBR(new Date(contact.updatedAt)),
    };

    return res.json(formattedContact);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar contato!" });
  }
};


export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e Email são obrigatórios!" });
    }
    const newContact = await service.createContact({ name, email, phone });

    const formattedContact = {
      ...newContact,
      createdAt: formatDateToBR(new Date(newContact.createdAt)),
      updatedAt: formatDateToBR(new Date(newContact.updatedAt)),
    };

    return res.status(201).json(formattedContact);

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

    const formattedUpdated = {
      ...updated,
      createdAt: formatDateToBR(new Date(updated.createdAt)),
      updatedAt: formatDateToBR(new Date(updated.updatedAt)),
    };

    return res.json(formattedUpdated);

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
