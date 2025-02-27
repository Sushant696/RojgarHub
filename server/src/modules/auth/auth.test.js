import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../server.js";
import db from "../../db/db.js";
import hash from "../../utils/hash.js";

describe("Auth Module", () => {
  let testUser;
  let validAccessToken;
  let validRefreshToken;

  beforeAll(async () => {
    await db.$transaction([
      db.interview.deleteMany(),
      db.jobApplication.deleteMany(),
      db.job.deleteMany(),
      db.employerProfile.deleteMany(),
      db.candidateProfile.deleteMany(),
      db.user.deleteMany(),
    ]);
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  const createTestUser = async (role = "CANDIDATE") => {
    const hashedPassword = await hash.generate("password123");
    return db.user.create({
      data: {
        username: "testuser",
        email: "test@example.com",
        contact: "1234567890",
        password: hashedPassword,
        role,
      },
    });
  };

  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const userData = {
        username: "newuser",
        email: "new@example.com",
        contact: "0987654321",
        password: "password123",
        role: "CANDIDATE",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body.data.createdUser).toHaveProperty("id");
    });
  });

  describe("POST /auth/login", () => {
    beforeAll(async () => {
      testUser = await createTestUser();
    });

    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        contact: "1234567890",
        password: "password123",
      });

      validAccessToken = res.body.data.accessToken;
      validRefreshToken = res.headers["set-cookie"][0]
        .split(";")[0]
        .split("=")[1];

      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(validAccessToken).toBeDefined();
    });
  });

  describe("GET /auth/logout", () => {
    it("should logout the user", async () => {
      const res = await request(app)
        .get("/api/auth/logout")
        .set("Authorization", `Bearer ${validAccessToken}`);

      expect(res.statusCode).toEqual(StatusCodes.OK);
    });
  });

  describe("GET /auth/refresh", () => {
    it("should refresh the access token", async () => {
      const res = await request(app)
        .get("/api/auth/refresh")
        .set("Cookie", [`refreshToken=${validRefreshToken}`]);

      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body.data).toHaveProperty("accessToken");
    });
  });
});
