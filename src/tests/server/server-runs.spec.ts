import request from "supertest";
import Server from "../../server";
import config from "../../config/config";

const s = new Server();

describe("server checks", function () {
  it("server instantiated without error", function (done) {
    request(s.app).get(`/${config.apiPrefix}/${config.apiVersion}/`).expect(401, done);
  });
});
