import e from 'express';
import TodoController from '../controllers/todo.controller.js';

const router = e.Router();

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodos);

export default router;