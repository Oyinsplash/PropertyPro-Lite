import { expect } from "chai";
import path from "path";
import request from "supertest";
import faker from "faker";
import app from "../app";
import Helpers from "../helpers/helpers";

const validToken = Helpers.generateToken(1, false);
const invalidToken = "InR5cCI6IkpXVCJ9.eyJ1c2VyaWQ.InR5cCI6IkpXVCJ9.eyJ1c2VyaWQ";

// Post a Property
describe("Property Route Endpoints", () => {
  describe("POST api/v1/property", () => {
    it("should allow an authenticated user to successfully post a property advert if all the required data has been provided", done => {
      request(app)
        .post("/api/v1/property")
        .field("status", "Available")
        .field("price", 150000.0)
        .field("state", "Lagos")
        .field("city", "Ikeja")
        .field("address", "18, Adelabu street")
        .field("type", "2 bedroom")
        .field("purpose", "For Rent")
        .attach(
          "image",
          path.resolve(
            __dirname,
            "../../../UI/img/houses/marion-michele-770316-unsplash.jpg"
          )
        )
        .set("Authorization", validToken)
        .set("Connection", "keep-alive")
        .expect(201)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal("Success");
          expect(data).to.have.all.keys(
            "id",
            "status",
            "type",
            "state",
            "city",
            "address",
            "price",
            "created_on",
            "image_url",
            "purpose",
            "imageName"
          );
        })
        .end(done);
    });
    it("should prevent a user who has not been authenticated from posting a property advert", done => {
      request(app)
        .post("/api/v1/property")
        .field("status", "Available")
        .field("price", 80000.0)
        .field("state", "Lagos")
        .field("city", "Ikeja")
        .field("address", "30, Caleb Road")
        .field("type", "2 bedroom")
        .field("purpose", "For Rent")
        .attach(
          "image",
          path.resolve(
            __dirname,
            "../../../UI/img/houses/marion-michele-770316-unsplash.jpg"
          )
        )
        .set("Connection", "keep-alive")
        .expect("Content-Type", /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal("401 Unauthorized");
          expect(error).to.equal("Access token is Required");
        })
        .end(done);
    });

    it("should prevent a user from posting a property advert if he/she provides invalid input parameters", done => {
      request(app)
        .post("/api/v1/property")
        .field("status", "Available")
        .field("price", "rhjfioo")
        .field("state", "Lagos")
        .field("city", 12344)
        .field("address", "30, Caleb Road")
        .field("type", "2 bedroom")
        .field("purpose", "For Rent")
        .attach(
          "image",
          path.resolve(__dirname, "../../../UI/assets/images/pic.jeg")
        )
        .set("Connection", "keep-alive")
        .set("Authorization", validToken)
        .expect("Content-Type", /json/)
        .expect(401)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal("400 Bad Request");
          expect(res.body).to.have.all.keys("status", "error", "errors");
        })
        .end(done);
    });
    it("should prevent a user from posting an advert if not all the required data is provided", done => {
      request(app)
        .post("/api/v1/property")
        .field("status", "Available")
        .field("price", "")
        .field("state", "Lagos")
        .field("city", "Ikeja")
        .field("address", "")
        .field("type", "2 bedroom")
        .field("purpose", "For Rent")
        .attach(
          "image",
          path.resolve(
            __dirname,
            "../../../UI/img/houses/marion-michele-770316-unsplash.jpg"
          )
        )
        .set("Connection", "keep-alive")
        .set("Authorization", validToken)
        .expect("Content-Type", /json/)
        .expect(401)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal("400 Bad Request");
          expect(res.body).to.have.all.keys("status", "error", "errors");
        })
        .end(done);
    });
  });
});
