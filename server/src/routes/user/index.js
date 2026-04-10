import {Router} from "express";


import { login, me, refreshToken, register } from "../../controllers/user/index.js";
import { validateLogin, validateRegister } from "../../middlewares/validators/user.validator.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",validateRegister, register );
router.post("/login", validateLogin, login )
router.post("/refresh-token", refreshToken);
router.get("/me",isAuthenticated ,me)

export default router;
