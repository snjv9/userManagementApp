const appServer = require('../server')
const request = require('supertest')


// describe('Test the root path', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(app).get('/');
//         expect(response.statusCode).toBe(404);
//     });
// });

describe('Test user CRUD operations', () => {
    let userId;

    test('It should create a new user', async () => {
        const response = await request(appServer)
            .post('/api/v1/users')
            .send({
                name: 'Test User',
                email: 'testuser@gmail.com',
                phoneNumber: '1234567890'
            });
        expect(response.statusCode).toBe(201);
        userId = response.body.data._id; // Save the user ID for later tests

    });

    test('It should retrieve all users', async () => {
        const response = await request(appServer).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
    });

    test('It should retrieve a specific user', async () => {
        const response = await request(appServer).get(`/api/v1/users/${userId}`);
        expect(response.statusCode).toBe(200);
    });

    test('It should update a specific user', async () => {
        const response = await request(appServer)
            .patch(`/api/v1/users/${userId}`)
            .send({
                name: 'Updated Test User'
            });
        expect(response.statusCode).toBe(200);
    });

    test('It should delete a specific user', async () => {
        const response = await request(appServer).delete(`/api/v1/users/${userId}`);
        expect(response.statusCode).toBe(204);
    });
});

afterAll(async () => {
    await appServer.close();
})