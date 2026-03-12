import request from 'supertest';
import app from '../../app.js';
import newTodo from '../../mock-data/new-todo.json';
import TodoModel from '../../models/todo.model.js';
import { beforeEach, describe, it, jest } from '@jest/globals';

const endPointUrl = '/todos/';
let firstTodo, newTodoId;

const testData = {
    title: "Test todo",
    done: false
}
const nonExistingId = "612345678901234567890123";

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

    it("GET " + endPointUrl, async () => {
        const response = await request(app).get(endPointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });

    it("GET by id" + endPointUrl + ":id", async () => {
        const response = await request(app).get(endPointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });

    it("GET by id with non existing id" + endPointUrl + ":id", async () => {
        const response = await request(app).get(endPointUrl + nonExistingId);
        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual({ message: "Todo not found" });
    });

    it("PUT " + endPointUrl + ":id", async () => {
        const response = await request(app)
            .put(endPointUrl + firstTodo._id)
            .send(testData);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    });

    it("PUT with non existing id " + endPointUrl + ":id", async () => {
        const response = await request(app)
            .put(endPointUrl + nonExistingId)
            .send(testData);

        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual({ message: "Todo not found" });
    });
});
