import TodoModel from "../models/todo.model.js";

class TodoController {
  async createTodo(req, res) {
    const createModel = await TodoModel.create(req.body);
    res.status(201).json(createModel);
  }
};

export default new TodoController();
