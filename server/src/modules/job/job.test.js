import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../server.js";
import db from "../../db/db.js";
import hash from "../../utils/hash.js";

describe("Job Module", () => {
  let testEmployer;
  let employerAccessToken;
  let testJob;
  let employerProfile;

  beforeAll(async () => {
    await db.$transaction([
      db.interview.deleteMany(),
      db.jobApplication.deleteMany(),
      db.job.deleteMany(),
      db.employerProfile.deleteMany(),
      db.candidateProfile.deleteMany(),
      db.user.deleteMany(),
    ]);

    const hashedPassword = await hash.generate("password123");
    testEmployer = await db.user.create({
      data: {
        username: "testemployer",
        email: "employer@example.com",
        contact: "1234567899",
        password: hashedPassword,
        role: "EMPLOYER",
      },
    });

    employerProfile = await db.employerProfile.create({
      data: {
        userId: testEmployer.id,
        companyName: "Test Company",
        companyDescription: "A test company",
        location: "Test Location",
        websiteLink: "https://example.com",
      },
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      contact: "1234567899",
      password: "password123",
    });

    employerAccessToken = loginRes.body.data.accessToken;

    const jobData = {
      employerId: employerProfile.id,
      title: "Test Job",
      jobDescription: "This is a test job description",
      requirements: ["Req 1", "Req 2"],
      type: "FULL_TIME",
      location: "Remote",
      skills: ["Skill 1", "Skill 2"],
      salaryMin: 50000,
      salaryMax: 70000,
    };

    testJob = await db.job.create({
      data: jobData,
    });
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  describe("POST /job/", () => {
    it("should create a new job with valid data", async () => {
      const jobData = {
        title: "Software Engineer",
        jobDescription: "We are looking for a software engineer",
        requirements: ["Bachelor's degree", "3 years experience"],
        type: "FULL_TIME",
        location: "New York",
        skills: ["JavaScript", "React", "Node.js"],
        salaryMin: 80000,
        salaryMax: 120000,
      };

      const res = await request(app)
        .post("/api/job")
        .set("Authorization", `Bearer ${employerAccessToken}`)
        .send(jobData);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data).toHaveProperty("id");

      const job = await db.job.findUnique({
        where: { id: res.body.data.id },
      });
      expect(job).toBeTruthy();
    });

    it("should return 401 when unauthenticated", async () => {
      const res = await request(app).post("/api/job").send({
        title: "Software Engineer",
      });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe("GET /job/", () => {
    it("should get all jobs", async () => {
      const res = await request(app).get("/api/job");

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("PATCH /job/:jobId", () => {
    it("should update a job with valid data", async () => {
      const res = await request(app)
        .patch(`/api/job/${testJob.id}`)
        .set("Authorization", `Bearer ${employerAccessToken}`)
        .send({
          title: "Updated Job Title",
          jobDescription: "Updated job description",
        });

      expect(res.statusCode).toBe(StatusCodes.OK);

      const updatedJob = await db.job.findUnique({
        where: { id: testJob.id },
      });
      expect(updatedJob.title).toBe("Updated Job Title");
    });

    it("should return 401 when updating without authentication", async () => {
      const res = await request(app).patch(`/api/job/${testJob.id}`).send({
        title: "Unauthorized Update",
      });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe("DELETE /job/:jobId", () => {
    it("should delete a job", async () => {
      const jobToDelete = await db.job.create({
        data: {
          employerId: employerProfile.id,
          title: "Job to Delete",
          jobDescription: "This job will be deleted",
          requirements: ["Req 1"],
          type: "PART_TIME",
          location: "Office",
          skills: ["Skill 1"],
          salaryMin: 30000,
          salaryMax: 40000,
        },
      });

      const res = await request(app)
        .delete(`/api/job/${jobToDelete.id}`)
        .set("Authorization", `Bearer ${employerAccessToken}`);

      expect(res.statusCode).toBe(StatusCodes.OK);

      const deletedJob = await db.job.findUnique({
        where: { id: jobToDelete.id },
      });
      expect(deletedJob).toBeNull();
    });
  });
});
