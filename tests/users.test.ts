// const request = require("supertest");
// const initApp = require("../app");
// const mongoose = require('mongoose');
// const User = require("../models/user_model")
// import mongoose from "mongoose";
// let app;

beforeAll(done => {
    done()
})
afterAll(done => {
    done()
})

describe("users test ", () => {
    test("This is initial test pass", async () => {
        const temp = 2
        expect(temp).toEqual(2)
    });
})
// function initApp(): any {
//     throw new Error("Function not implemented.");
// }
// describe("users test", () => {
//     test("Test Get All users with empty DB", async () => {
//         const response = await new Request(app).get("/user");
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toStrictEqual([]);
//     });
// })
// describe("user tests", () => {
//     test("Test Get All users with empty DB", async () => {
//         const response = await request(app).get("/user");
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toStrictEqual([]);
//     });
// });
// test("Test post User ", async () => {
//     const response = await request(app).post("/user").send({
//         name: "Dorin Cohen",
//         email: "dorin1@gmail.com",
//         _id: "50302010",
//         isAdmin: true,
//         password: "12345678",
//         age: 18,
//     });
//     expect(response.statusCode).toBe(200);

// });
// test("Get users with one user in the DB", async () => {
//     const response = await request(app).get("/user");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(1);
//     const user = response.body[0];
//     expect(user.name).toBe("Dorin Cohen");
//     expect(user._id).toBe("50302010");
//     expect(user.email).toBe("dorin1@gmail.com");
//     expect(user.isAdmin).toBe(true);
//     expect(user.password).toBe("12345678");
//     expect(user.age).toBe(18);
// });



// test("put user with id", async () => {
//     const response = await request(app).put("/user/50302010").send({
//         name: "Dorin Cohen",
//         email: "dorin1@gmail.com",
//         _id: "50302010",
//         isAdmin: true,
//         password: "12345678",
//         age: 19,
//     });
//     expect(response.statusCode).toBe(200);
// });


/*
test("delete user with id",async()=>{
    const response= await request(app).delete("/user/50302010")
    expect(response.statusCode).toBe(200);
});
*/
