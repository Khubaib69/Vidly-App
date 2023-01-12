const request = require('supertest');
const { Register } = require('../../models/register');
const { Genre } = require('../../models/genres');

let server;


describe("Auth MiddleWare", () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        await Genre.remove({});
        await server.close();
    });

    it("Should return 401 if no token is provided", async () => {
        const res = await request(server).post('/api/genres').send({ name: 'Genre' });
        expect(res.status).toBe(401);
    });

    it("Should return 400 if token is invalid", async () => {
        // const token = new Register().generateAuthToken();
        const token = "SDadasd";
        const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: "genre1" });
        expect(res.status).toBe(400);

    })

    it("Should return 200 if token is valid", async () => {
        const token = new Register().generateAuthToken();
        const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: "genre1" });
        expect(res.status).toBe(200);

    })
})