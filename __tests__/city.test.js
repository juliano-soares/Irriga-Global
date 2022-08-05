const request = require("supertest");
const app = require("../src/app");

describe('Cities', () => {
  it('should return all cities', async () => {
    const response = await request(app).get('/cities');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
  });
});