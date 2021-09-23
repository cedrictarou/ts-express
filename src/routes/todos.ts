import { Router } from "express";
import { Todo } from '../entity/Todo';


const router = Router();
router.get('/', async (req, res) => {
  const todos = await Todo.find()
  res.json({ todos });
});

export default router;