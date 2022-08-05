const request = require("supertest");
const app = require("../src/app");

describe('Weather', () => {  
  it('should return all weather to all cities', async () => {
    const response = await request(app).get('/weather');

    expect(response.status).toBe(201);
  }, 30000);
  
  it('should return the weather to a cities', async () => {
    const response = await request(app).get('/weather/1');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("city_id");
  }, 30000);
});