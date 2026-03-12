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

  async getTodos(req, res, next) {
    try {
      const allTodos = await TodoModel.find({});
      res.status(200).json(allTodos);
    } catch (error) {
      next(error);
    }
  };

  async getTodoById(req, res, next) {
    try {
      const todo = await TodoModel.findById(req.params.id);
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  async updateTodo(req, res, next) {
    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, 
        { new: true, useFindAndModify: false });
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      next(error);
    }
  };
  
}

export default new TodoController();
