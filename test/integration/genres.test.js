const { mongoose } = require('mongoose');
const request = require('supertest');
const { Genre } = require('../../models/genres');
const { Register } = require('../../models/register');


// set NODE_ENV=test for running tests

let server;

// this will contain all the tests for /api/genres 
describe('/api/genres', () => {
    // listen to request at port 3000 but whenever a change is happen it will first close the server at port 3000 and then again restart it
    // so old server dont stay open all the time
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        // After everytest it will clear the document in db
        server.close();
        await Genre.remove({})
    });

    // this is for the get request in /api/genres 
    describe('GET/', () => {
        it("Should Return All genres", async () => {

            await Genre.collection.insertMany([
                { name: "Genere1" },
                { name: "Genere2" }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        })
    });

    // this is for the get the specific genere request in /api/genres 
    describe('GET/:id', () => {
        it("Should Return genres with given id", async () => {
            const genre = new Genre({ name: "Genere1" });
            await genre.save();
            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        })

        it("Should Return 404 if invalid id is passed", async () => {
            const genre = new Genre({ name: "Khubaib" });
            await genre.save();

            const res = await request(server).get(`/api/genre:${1}`);
            expect(res.status).toBe(404);
        })

        it("Should return 404 if no genre with given id exists", async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/genres/${id}`);
            expect(res.status).toBe(404);
        })

    });

    // this is for the Post requests in /api/genres 
    describe("POST/", () => {
        it("Should return 401 if client is not logged in", async () => {

            const res = await request(server).post('/api/genres').send({ name: 'genre1' });
            expect(res.status).toBe(401);
        });

        it("Should return 400 if genre is invalid less than 5 char", async () => {
            const token = new Register().generateAuthToken();
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: '1234' });
            // expect(res.status).toBe(400);
        })

        it("Should save the genre if the everything is valid", async () => {
            const token = new Register().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: "genre1" });
            expect(res.status).toBe(200);

            const genre = await Genre.find({ name: 'genre1' });

            expect(genre).not.toBeNull();

        })

        it("Should return the genre if it is valid", async () => {
            const token = new Register().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: "genre1" });

            expect(res.body).toHaveProperty('_id');

        })
    })


    describe("DELETE/:id", () => {
        it("Should return 400 if genre not found", async () => {
            const id = mongoose.Types.ObjectId();
            console.log(id);
            // const token = new Register({ _id: id.toHex }).generateAuthToken();
            // const res = await request(server).del(`/api/genres/${id}`).set('x-auth-token', token);
            // console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", res.status);
        });
    })

})