import express from 'express';
import { deletetask, Updatetask, getMytasks,newtask } from '../controllers/task.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new", isAuthenticated,newtask);

router.get("/my",isAuthenticated, getMytasks);

router.route("/:id")
.put(isAuthenticated, Updatetask)
.delete(isAuthenticated, deletetask)

export default router;