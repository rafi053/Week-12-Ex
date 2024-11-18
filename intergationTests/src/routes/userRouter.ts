import { Router } from 'express'
import { deleteUser, editName, login, register,message } from '../controllers/someStuff';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.use(authMiddleware)
router.route('/message').get(message) 
router.route('/editname').put(editName);
router.route('/deleteuser').delete(deleteUser);
export default router