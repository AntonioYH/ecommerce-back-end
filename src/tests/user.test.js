const request = require("supertest");
const app = require("../app");

let userId;
let token;

test("POST /users should return status 201 and successfully create a new user", async () => {
	const user = {
		firstName: "Antonio",
		lastName: "Yustis",
		email: "antonio@example.com",
		password: "password",
		phone: "12345",
	};

	const res = await request(app).post("/users").send(user);
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	userId = res.body.id;
});

test("POST /users/login should return status 200 and also return a token", async () => {
	const res = await request(app).post("/users/login").send({
		email: "antonio@example.com",
		password: "password",
	});

	expect(res.status).toBe(200);
	expect(res.body.token).toBeDefined();

	token = res.body.token;
});

test("GET /users should return status 200 and get the user we just created", async () => {
	const res = await request(app)
		.get("/users")
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(2);
});

test("PUT /users/:id should return status 200 and successfully updated the current user", async () => {
	const res = await request(app)
		.put(`/users/${userId}`)
		.send({ firstName: "Jose" })
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body.firstName).toBe("Jose");
});

test("POST /user/login should return 401", async () => {
	const res = await request(app)
		.post("/users/login")
		.send({ email: "invalidEmail", password: "invalidPassword" });

	expect(res.status).toBe(401);
});

test("DELETE /users/:id should return status 204 and successfully remove the current user from the database", async () => {
	const res = await request(app)
		.delete(`/users/${userId}`)
		.set("Authorization", `Bearer ${token}`);

	expect(res.status).toBe(204);
});
