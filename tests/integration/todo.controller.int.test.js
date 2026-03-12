import request from 'supertest';
import app from '../../app.js';
import newTodo from '../../mock-data/new-todo.json';
import TodoModel from '../../models/todo.model.js';
import { beforeEach, jest } from '@jest/globals';

const endPointUrl = '/todos/';

TodoModel.create = jest.fn();

beforeEach(() => {
    TodoModel.create.mockResolvedValue(newTodo);
});

describe(endPointUrl, () => {
    it("POST " + endPointUrl, async () => {
        const response = await request(app)
            .post(endPointUrl)
            .send(newTodo);

        expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });
})
