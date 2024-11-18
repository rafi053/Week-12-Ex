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
  let token:string;

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

  test("GET users/login, login a user in the database, should pass", async () => { 
     const res = await request(app).post("/users/login").send({
       email: "Ariel@gmail.com",
        password: "123456"
       });
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.message).toBe("Welcome Ariel" )
        token = res.body.data.token
  });

  test("GET users/login, login a user in the database, should fail", async () => { 
    const res = await request(app).post("/users/login").send({
      email: "Ariel@gmail.com",
       password: "1234"
      });
       expect(res.status).toBe(401);
       expect(res.body).toHaveProperty("message");
       expect(res.body.success).toBe(false);
           
  });

  test("PUT /users/editName, edit a user name in the database, should pass", async () => {
    const res = await request(app).put("/users/editName").set("Cookie", `token=${token}`)
    .send({
      name: "Esterika",
      _id: id,
    });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Esterika");
    expect(res.body.message).toBe("Name was changed to: Esterika");

  });

  test("PUT /users/editName, edit a user name in the database, should fail", async () => {
    const res = await request(app).put("/users/editName").set("Cookie", `token=${token}`)
    .send({
      name: "Esterika",
    });
    expect(res.status).toBe(404); 
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toBe(false);
  });

  test("DELETE /users/deleteUser, delete a user in the database, should pass", async () => {  
    const res = await request(app).delete("/users/deleteUser").set("Cookie", `token=${token}`)
    .send({
      _id: id,
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toStrictEqual({_id: id});
    expect(res.body.message).toBe("Esterika was deleted successfully")

  })

  test("DELETE /users/deleteUser, delete a user in the database, should fail", async () => {  
    const res = await request(app).delete("/users/deleteUser").set("Cookie", `token=${token}`)
    .send({
    });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toBe(false);
  })
});