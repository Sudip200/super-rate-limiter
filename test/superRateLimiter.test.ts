import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../src/middlewares/superRateLimiter";

describe("superRateLimiter middleware", () => {
  test("should rate limit requests", async () => {
    const app = express();

    // Apply rate limiter
    app.use(
      superRateLimiter({
        algorithm: "leaky-bucket",
        storeType: "in-memory",
        leakRatePerSec:2,
        capacity:5
      })
    );

    // Properly typed route handler
    app.get("/", (_req: express.Request, res: express.Response) => {
      res.send("OK");
    });

    const agent = request(app);

    // First two requests
    await agent.get("/").expect(200);
    await agent.get("/").expect(200);

    // Third request (rate limited)
    await agent.get("/").expect(429);
  });
});
