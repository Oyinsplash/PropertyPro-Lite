import request from "supertest";
import { expect } from "chai";
import faker from "faker";
import app from "../app";

// Authentication route unit test

describe("Auth Route Endpoints", () => {
  describe("POST api/v1/auth/signup", () => {
    it("should register a user successfully provided all the required data is provided", done => {
      request(app)
        .post("/api/v1/auth/signup")
        .send({
          first_name: "oyin",
          last_name: "splash",
          email: "splash@yahoo.co.uk",
          phoneNumber: "07033444447",
          password: "abc123",
          confirm_password: "abc123"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .expect(res => {
          expect(res.body.status).to.equal("Success");
          expect(res.body.data).to.have.all.keys(
            "id",
            "first_name",
            "last_name",
            "email",
            "token"
          );
        })
        .end(done);
    });
    it("should not register a user if all required data are not provided", done => {
      request(app)
        .post("/api/v1/auth/signup")
        .send({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: "",
          phoneNumber: "",
          password: faker.internet.password(),
          confirm_password: faker.internet.password()
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(res => {
          expect(res.body.status).to.equal("400 Invalid Request");
          expect(res.body.data).to.have.all.keys("status", "error");
        })
        .end(done);
    });
    it("should not register a user if a required field contains invalid data", done => {
      request(app)
        .post("/api/v1/auth/signup")
        .send({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: "splash@yahoo",
          phoneNumber: "07033fg4447",
          password: faker.internet.password(),
          confirm_password: faker.internet.password()
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(res => {
          expect(res.body.status).to.equal("400 Invalid Request");
          expect(res.body.data).to.have.all.keys("status", "error");
        })
        .end(done);
    });
    it("should not register a user if a required field contains invalid data", done => {
      request(app)
        .post("/api/v1/auth/signup")
        .send({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: "splash@yahoo",
          phoneNumber: "07033fg4447",
          password: faker.internet.password(),
          confirm_password: faker.internet.password()
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(res => {
          expect(res.body.status).to.equal("400 Invalid Request");
          expect(res.body.data).to.have.all.keys("status", "error");
        })
        .end(done);
    });
    it("should not register a user if the data provided already exist in the database", done => {
      request(app)
        .post("/api/v1/auth/signup")
        .send({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: "splash@yahoo",
          phoneNumber: "07033444447",
          password: "abc123",
          confirm_password: "abc123"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(res => {
          expect(res.body.status).to.equal("409 Conflict");
          expect(res.body.data).to.have.all.keys("status", "error");
        })
        .end(done);
    });
  });
});
