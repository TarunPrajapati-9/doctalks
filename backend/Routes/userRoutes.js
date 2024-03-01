
import express from 'express';
import { registerUser, loginUser, listDoctors, getOneDoctor,listSessions } from '../Controllers/userController.js';
import { checkout } from '../Controllers/checkoutStripe.js';

const router = express.Router();

// Your code continues here


router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/listdoctors', listDoctors);
router.get('/getonedoctor/:id', getOneDoctor);

router.get('/listsessions', listSessions);


router.post('/create-checkout-session', checkout);


export default router;