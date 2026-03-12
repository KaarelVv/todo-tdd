import TodoController from "../../controllers/todo.controller.js";
import TodoModel from "../../models/todo.model.js";
import httpMocks from "node-mocks-http";
import { beforeEach, it, jest } from "@jest/globals";
import newTodo from "../../mock-data/new-todo.json";


TodoModel.create = jest.fn();
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
})

