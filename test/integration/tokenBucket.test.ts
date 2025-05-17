import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../../src/middlewares/superRateLimiter";

describe("Token Bucket - superRateLimiter middleware", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("should limit requests and refill tokens over time", async () => {
    const app = express();

    app.use(
      superRateLimiter({
        algorithm: "token-bucket",
        storeType: "in-memory",
        capacity: 2,
        refillRatePerSec: 1,
      })
    );

    app.get("/", (_req: express.Request, res: express.Response) => {
          res.send("OK");
    });
    const agent = request(app);

    await agent.get("/").expect(200);
    await agent.get("/").expect(200);
    await agent.get("/").expect(429);

    vi.advanceTimersByTime(1000);
    await agent.get("/").expect(200);
  });
});
