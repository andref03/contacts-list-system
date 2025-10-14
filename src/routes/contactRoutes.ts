import { Router } from 'express';
import * as contactController from '../controllers/contactController.js';

const router = Router();

// definindo as rotas e associando aos controladores
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

export default router;
