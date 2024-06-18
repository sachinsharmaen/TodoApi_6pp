import express from "express";
import { login,logout,getMyprofile,register } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/userid/:id", getUser);
// router.put("/userid/:id", UpdateUser);
// router.delete("/userid/:id", DeleteUser);

// if main route is same then we can also do like this
// router.route('/userid/:id').get(getUser);
router.get('/me', isAuthenticated,getMyprofile);

export default router;
