import { PrismaClient } from "@prisma/client";
import type { Contact } from "@prisma/client";

const prisma = new PrismaClient();

export const getContacts = async (): Promise<Contact[]> => {
	return prisma.contact.findMany();
};

export const getContactById = async (id: number) => {
  return prisma.contact.findUnique({ where: { id } });
};


export const createContact = async (data: {
	name: string;
	email: string;
	phone?: string | null;
}) => {
	return prisma.contact.create({ data });
};

export const updateContact = async (
	id: number,
	data: { name?: string; email?: string; phone?: string | null }
) => {
	return prisma.contact.update({ where: { id }, data });
};

export const deleteContact = async (id: number) => {
	return prisma.contact.delete({ where: { id } });
};
