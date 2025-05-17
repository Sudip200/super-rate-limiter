import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import express from "express";
import request from "supertest";
import { superRateLimiter } from "../../src/middlewares/superRateLimiter";

describe("Sliding Window - superRateLimiter middleware", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("should respect sliding window logic", async () => {
    const app = express();

    app.use(
      superRateLimiter({
        algorithm: "sliding-window",
        storeType: "in-memory",
        maxRequests: 2,
        windowSizeInMS: 4000,
      })
    );

    app.get("/", (_req: express.Request, res: express.Response) => {
              res.send("OK");
    });
    const agent = request(app);

    await agent.get("/").expect(200); // t=0
    vi.advanceTimersByTime(1000);     // t=1s
    await agent.get("/").expect(200); // count = 2
    await agent.get("/").expect(429); // limit hit

    vi.advanceTimersByTime(3000);     // t=4s, first request expired
    await agent.get("/").expect(200); // now allowed again
  });
});
