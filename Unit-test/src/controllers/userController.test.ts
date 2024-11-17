import app from "../app";
import request from 'supertest'
import { IUser, IUserTow } from "../types/types";

describe("GET /massage", () => {   
    test("should return massage hello world", async () => {
        const response = await request(app).get("/massage");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("hello world");
    })
});

describe("POST /user", () => {   
    test("should return name and id", async () => {
        const requestBody = {name: "test", id: 1};
        const response = await request(app).post("/user").send(requestBody);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(requestBody);
    })
    test('should return 400 if name is missing', async () => {
        const requestBody = {id: 1};
        const response = await request(app).post("/user").send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body).toBe("name or id are required");
    })
});


describe("POST /userData", () => {   
    test("should return IUser", async () => {
        const response = await request(app).post("/user/1");
        const user: IUser = {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496"
              }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets"
            }
            }
            const userTow: IUserTow = {
                user
            }
        expect(response.status).toBe(201);
        expect(response.body).toEqual(userTow);
        
    })
    test('should return 400 if id is greater than 10', async () => {
        const response = await request(app).post("/user/11");
        expect(response.status).toBe(400);
        expect(response.body).toBe("id must be less than 10");
    })
});  