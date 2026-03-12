import TodoController from "../../controllers/todo.controller.js";
import TodoModel from "../../models/todo.model.js";
import httpMocks from "node-mocks-http";
import { beforeEach, describe, it, jest } from "@jest/globals";
import newTodo from "../../mock-data/new-todo.json";
import allTodos from "../../mock-data/all-todos.json";


TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn();
})

describe("TodoController.createTodo", () => {
    beforeEach(() => {
        req.body = newTodo;
    })
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModel.create", async () => {
        req.body = newTodo;
        await TodoController.createTodo(req, res, next)
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    })
    it("should return 201 response code", async () => {
        await TodoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('should run json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next)
        expect(res._getJSONData()).toEqual(newTodo);
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error creating todo" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    
});

describe("TodoController.getTodos", () => {
    it("should have a getTodos function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });
    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodos(req, res, next)
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it("should return 200 response code and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next)
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(allTodos);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error getting todos" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("TodoController.getTodoById", () => {
    it("should have a getTodoById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });
    it("should call TodoModel.findById with route parameter id", async () => {
        req.params.id = "69b29fe18447dd2a2d50c457";
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toHaveBeenCalledWith("69b29fe18447dd2a2d50c457");
    });
    it("should return 200 response code and the requested todo", async () => {
        const todo = allTodos[0];
        TodoModel.findById.mockReturnValue(todo);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(todo);
    });
    it("should return 404 response code when the requested todo does not exist", async () => {
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: "Todo not found" });
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error getting todo" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

