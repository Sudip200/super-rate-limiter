import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../../src/middlewares/superRateLimiter";

describe("Fixed Window - superRateLimiter middleware", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("should limit requests within fixed window", async () => {
    const app = express();

    app.use(
      superRateLimiter({
        algorithm: "fixed-window",
        storeType: "in-memory",
        maxRequests: 2,
        windowSizeInMS: 3000,
      })
    );

    app.get("/", (_req: express.Request, res: express.Response) => {
      res.send("OK");
    });


    const agent = request(app);

    await agent.get("/").expect(200);
    await agent.get("/").expect(200);
    await agent.get("/").expect(429);

    vi.advanceTimersByTime(3001);
    await agent.get("/").expect(200);
  });
});
