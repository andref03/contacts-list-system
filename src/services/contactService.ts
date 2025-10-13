import { PrismaClient } from "@prisma/client";
import type { Contact } from "@prisma/client";

const prisma = new PrismaClient();

export type GetContactsParams = {
	q?: string;
	page?: number;
	pageSize?: number;
	sort?: string;
	order?: 'asc' | 'desc';
};

export const getContacts = async (params?: GetContactsParams) => {
	const page = params?.page && params.page > 0 ? params.page : 1;
	const pageSize = params?.pageSize && params.pageSize > 0 ? params.pageSize : 10;
	const where = params?.q
		? {
			  OR: [
				  { name: { contains: params.q, mode: 'insensitive' as any } },
				  { email: { contains: params.q, mode: 'insensitive' as any } },
			  ],
		  }
		: undefined;

	const orderBy: any = params?.sort
		? { [params.sort]: params.order === 'asc' ? 'asc' : 'desc' }
		: { createdAt: 'desc' };

	const [data, total] = await Promise.all([
		prisma.contact.findMany({ where: where as any, skip: (page - 1) * pageSize, take: pageSize, orderBy }),
		prisma.contact.count({ where: where as any }),
	]);

	return { data, total, page, pageSize };
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
