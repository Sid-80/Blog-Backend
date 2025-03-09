import {
  getSelfDetails,
  LoginController,
  SigninController,
} from "../controller/Auth.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/middleware.js";

const router = Router();

router.post("/signup", SigninController);
router.post("/login", LoginController);
router.get("/self", verifyJWT, getSelfDetails);

export default router;
