import { Router } from 'express';
import { getContacts, getContact, sendOtp } from '../controller/contactController';

const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/:id/send-otp', sendOtp);
 
 

export default router;
