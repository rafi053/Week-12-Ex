import { Router } from "express";
import { massage, user, userData } from "../controllers/userController";

const router = Router();

router.route("/massage").get(massage);
router.route("/user").post(user);
router.route("/user/:id").post(userData);
    

export default router;
