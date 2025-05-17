import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../../src/middlewares/superRateLimiter";

describe("Leaky Bucket - superRateLimiter middleware", () => {
  test("should limit requests after capacity is reached", async () => {
    const app = express();

    app.use(
      superRateLimiter({
        algorithm: "leaky-bucket",
        storeType: "in-memory",
        capacity: 2,
        leakRatePerSec: 1,
      })
    );
    app.get("/", (_req: express.Request, res: express.Response) => {
      res.send("OK");
    });

    const agent = request(app);

    await agent.get("/").expect(200);
    await agent.get("/").expect(200);
    await agent.get("/").expect(429);
  });
});
