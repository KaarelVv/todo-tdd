import TodoModel from "../models/todo.model.js";

class TodoController {
  async createTodo(req, res, next) {
    try {
      const createModel = await TodoModel.create(req.body);
      res.status(201).json(createModel);
    } catch (error) {
      next(error);
    } 
  };
}

export default new TodoController();
