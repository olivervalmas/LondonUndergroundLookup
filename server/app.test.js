const request = require("supertest");
const app = require("./app");

describe("Test the London Underground Lookup API", () => {

  test("GET /lines/:name Success", () => {
    return request(app)
      .get("/lines/victoria")
      .expect(200);
  });

  test("GET /lines/:name Failure (Line not found)", () => {
    return request(app)
      .get("/lines/qwerty")
      .expect(404);
  });

  test("GET /lines/:name returns JSON", () => {
    return request(app)
      .get("/lines/victoria")
      .expect("Content-type", /json/);
  });

  test("GET /lines Success", () => {
    return request(app)
      .get("/lines")
      .expect(200);
  });

  test("GET /lines returns JSON", () => {
    return request(app)
      .get("/lines")
      .expect("Content-type", /json/);
  });

  test("GET /stations/:name Success", () => {
    return request(app)
      .get("/stations/bank")
      .expect(200);
  });

  test("GET /stations/:name Failure (Station not found)", () => {
    return request(app)
      .get("/stations/qwerty")
      .expect(404);
  });

  test("GET /stations/:name returns JSON", () => {
    return request(app)
      .get("/stations/bank")
      .expect("Content-type", /json/);
  });

  test("POST /lines/:name Success", () => {
    return request(app)
      .post("/lines/victoria")
      .send({
          rating: 4,
          password: "test"
      })
      .expect(201);
  });

  test("POST /lines/:name Failure (Unauthorised)", () => {
    return request(app)
      .post("/lines/victoria")
      .send({
        rating: 4,
        password: ""
      })
      .expect(401);
  });
});
