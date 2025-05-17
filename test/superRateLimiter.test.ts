import { describe, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../dist/middlewares/superRateLimiter";

describe("superRateLimiter middleware", () => {
  test("should rate limit requests", async () => {
    const app = express();

    // Apply rate limiter
    app.use(
      superRateLimiter({
        algorithm: "fixed-window",
        storeType: "in-memory",
        maxRequests: 2,
        windowSizeInMS: 1000,
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
