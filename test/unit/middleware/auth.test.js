const { Register } = require('../../../models/register');
const auth = require('../../../middleware/auth');


describe("authMiddleWare", () => {
    it("should populate req.user with the payload of a valid JWT", async () => {
        const token = new Register().generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {};
        const next = jest.fn();
        auth(req, res, next); 
        expect(req.user).toBeDefined();


    })
})