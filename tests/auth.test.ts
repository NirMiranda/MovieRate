
import initApp from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { Application } from "express";

let app: Application;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll testAuth");
});

afterAll(async () => {
    await mongoose.connection.close();
});

