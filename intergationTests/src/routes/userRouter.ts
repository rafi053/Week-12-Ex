import { Router } from 'express'
import { deleteUser, editName, login, register } from '../controllers/someStuff';
const router = Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/editname').put(editName);
router.route('/deleteuser').delete(deleteUser);
export default router