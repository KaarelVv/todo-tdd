import request from 'supertest';
import app from '../../app.js';
import newTodo from '../../mock-data/new-todo.json';
import TodoModel from '../../models/todo.model.js';
import { beforeEach, describe, it, jest } from '@jest/globals';

const endPointUrl = '/todos/';


describe(endPointUrl, () => {
    it("POST " + endPointUrl, async () => {
        const response = await request(app)
            .post(endPointUrl)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });
    it("should return error 500 on malformed data with POST", async () => {
        const response = await request(app)
            .post(endPointUrl)
            .send({ title: "Missing done property" });

        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({ message: "Todo validation failed: done: Path `done` is required." });
    });

    describe("GET " + endPointUrl, () => {
        it("should return an array of todos", async () => {
            const response = await request(app).get(endPointUrl);
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body[0].title).toBeDefined();
            expect(response.body[0].done).toBeDefined();
        });
    });
})
