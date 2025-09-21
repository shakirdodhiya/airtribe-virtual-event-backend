const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

const mockEvent = {
    title : 'Event title',
    date : '20-12-2025',
    time : '16:00',
    description : 'Event description'
}
const mockUser = {
    name: 'Ronnie Williams',
    email: 'Ronnie@rocket-snooker.com',
    password: 'rocket-snooker',
    role : 'Organizer'
};

const mockAttendeeUser = {
    name: 'Selby Mark',
    email: 'selby@rocket-snooker.com',
    password: 'selby-snooker',
    role : 'Attendee'
};

let token = '';
let attendee_token = '';
let created_event = {}

// Auth tests

tap.test('POST /users/register', async (t) => { 
    const response = await server.post('/users/register').send(mockUser);
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/register Attendee user', async (t) => { 
    const response = await server.post('/users/register').send(mockAttendeeUser);
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/register with missing email', async (t) => {
    const response = await server.post('/users/register').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/login', async (t) => { 
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });

    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /users/login Attendee', async (t) => { 
    const response = await server.post('/users/login').send({
        email: mockAttendeeUser.email,
        password: mockAttendeeUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    attendee_token = response.body.token;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Events tests

tap.test('POST /events', async (t) => {
    const response = await server.post('/events').set('Authorization', `Bearer ${token}`).send(mockEvent);
    t.equal(response.status, 200);

    created_event = response.body.event;
    t.end();
});

tap.test('POST /events without token', async (t) => {
    const response = await server.post('/events').send(mockEvent);
    t.equal(response.status, 401);
    t.end();
});

tap.test('POST /events with Attendee token', async (t) => {
    const response = await server.post('/events').set('Authorization', `Bearer ${attendee_token}`).send(mockEvent);
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /events/:id', async (t) => {

    console.log(created_event);
    const response = await server.put(`/events/${created_event._id}`).set('Authorization', `Bearer ${token}`).send({
        title : 'New Title'
    });
    t.equal(response.status, 200);
});

tap.test('Check PUT /events/:id', async (t) => {
    const response = await server.get(`/events/${created_event._id}`).set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.event.title, 'New Title');

    created_event = response.body.event
    t.end();
});

// Attendee Tests

tap.test('POST /events/:id/register', async (t) => {
    const response = await server.post(`/events/${created_event._id}/register`).set('Authorization', `Bearer ${attendee_token}`);

    console.log(response.status);
    
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /events/:id/register with Organizer token', async (t) => {
    const response = await server.post(`/events/${created_event._id}/register`).set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 401);
    t.end();
});

tap.test('GET /events/participated', async (t) => {
    const response = await server.get('/events/participated').set('Authorization', `Bearer ${attendee_token}`);
    t.equal(response.status, 200);
    t.same(response.body.events[0].title, 'New Title');
    t.end();
});

tap.teardown(() => {
    process.exit(0);
});