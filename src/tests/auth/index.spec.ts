import { expect } from "chai";
import request from "supertest";
import config from "../../config/config";
import Server from "../../server";

const s = new Server();

describe("login OK", function () {
  it("/login responds with 200", function (done) {
    request(s.app)
      .post(`/${config.apiPrefix}/${config.apiVersion}/login`)
      .send({username: '826682', password: '123456'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe("login fail - bad password", function () {
  it("/login responds with 401", function (done) {
    request(s.app)
      .post(`/${config.apiPrefix}/${config.apiVersion}/login`)
      .send({username: '826682', password: 'XXX'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe("login fail - username does not exist", function () {
  it("/login responds with 401", function (done) {
    request(s.app)
      .post(`/${config.apiPrefix}/${config.apiVersion}/login`)
      .send({username: 'XXXX', password: 'XXX'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});