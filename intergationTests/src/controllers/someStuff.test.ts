import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});
afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  // await mongoose.connection.dropDatabase();
});

describe("User API", () => {
  let id:string;

  test("POST /users/register, creating a new user in the database, should pass", async () => {
    const res = await request(app).post("/users/register").send({
      name: "Ariel",
      email: "Ariel@gmail.com",
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.name).toBe("Ariel");
    id= res.body.data._id
  });

  test("POST /users/register, creating a new user in the database, should fail", async () => {
    const res = await request(app).post("/users/register").send({
      name: "Ariel",
      email: "Ariel@gmail.com",
      password: "1234",
    });
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toBe(false);
  });

  test("PUT /users/editname, edit a users name in the database, should pass", async () => {

    const res = await request(app).put("/users/editname").send({
      name: "Esterika",
      _id: id,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Esterika");
    expect(res.body.message).toBe("Name was changed to: Esterika");
  });

});
