# Super Rate Limiter 🚀

[![npm version](https://img.shields.io/npm/v/super-rate-limiter)](https://www.npmjs.com/package/super-rate-limiter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A flexible, production-ready rate limiting middleware for Express.js with support for **multiple algorithms** and **pluggable storage backends**.

---

## ✨ Features

* 🎯 **Multiple Algorithms**

  * ✅ Fixed Window
  * ✅ Sliding Window
  * ✅ Token Bucket
  * ✅ Leaky Bucket

* 💾 **Storage Backends**

  * In-Memory (single instance)
  * Redis (distributed environments) [Coming Soon]

* 🔑 **Flexible Key Extraction**

  * Based on IP, API key, user ID, etc.

* ⚡ **High Performance**

  * Minimal latency overhead, async-ready

* 🛡️ **Type Safe**

  * Fully written in TypeScript

---

## 📦 Installation

```bash
npm install super-rate-limiter
# or
yarn add super-rate-limiter
```

---

## 🚦 Basic Usage

```ts
import express from 'express';
import { superRateLimiter } from 'super-rate-limiter';

const app = express();

app.use(superRateLimiter({
  algorithm: 'fixed-window',
  storeType: 'in-memory',
  maxRequests: 100,
  windowSizeInMS: 60 * 1000, // 1 minute
}));

app.get('/', (req, res) => res.send('Hello World!'));
```

---

## 🧠 Advanced Usage

### 🔑 Custom Key Extraction

```ts
app.use('/api', superRateLimiter({
  algorithm: 'leaky-bucket',
  storeType: 'in-memory',
  capacity: 10,
  leakRatePerSec: 1,
  keyExtractor: (req) => req.headers['api-key'] as string,
}));
```

---

## 📚 API Reference

### `superRateLimiter(options: RateLimiterOptions)`

| Parameter      | Type                                                                           | Required | Description                                           |
| -------------- | ------------------------------------------------------------------------------ | -------- | ----------------------------------------------------- |
| `algorithm`    | `"fixed-window"` \| `"sliding-window"` \| `"token-bucket"` \| `"leaky-bucket"` | ✅        | Rate limiting algorithm to apply                      |
| `storeType`    | `"in-memory"` \| `"redis"`                                                     | ✅        | Backend for rate limit data                           |
| `keyExtractor` | `(req: Request) => string`                                                     | ❌        | Function to extract unique key (defaults to `req.ip`) |

> Other fields depend on the selected algorithm:

### Algorithm-Specific Options

#### Fixed Window & Sliding Window

| Option           | Type   | Required | Description                             |
| ---------------- | ------ | -------- | --------------------------------------- |
| `maxRequests`    | number | ✅        | Max requests allowed                    |
| `windowSizeInMS` | number | ✅        | Size of the time window in milliseconds |

#### Token Bucket

| Option             | Type   | Required | Description                  |
| ------------------ | ------ | -------- | ---------------------------- |
| `capacity`         | number | ✅        | Maximum tokens in the bucket |
| `refillRatePerSec` | number | ✅        | Tokens added per second      |

#### Leaky Bucket

| Option           | Type   | Required | Description                                  |
| ---------------- | ------ | -------- | -------------------------------------------- |
| `capacity`       | number | ✅        | Max queue length                             |
| `leakRatePerSec` | number | ✅        | Requests leaked per second (rate of outflow) |

---

## 🤓 Algorithms Explained

### 1. **Fixed Window**

> A simple counter that resets every fixed interval.

✅ Simple, memory-efficient
❌ Susceptible to burst at edges

---

### 2. **Sliding Window**

> Smoother version of fixed window with rolling window counting.

✅ Smooth traffic control
❌ Slightly higher memory usage

---

### 3. **Token Bucket**

> Tokens are added at a fixed rate, requests consume tokens.

✅ Handles bursts well
✅ More flexible than fixed window
❌ Requires careful tuning

---

### 4. **Leaky Bucket**

> Queue-like structure, processes requests at a constant rate.

✅ Smooth flow, predictable rate
❌ Can delay burst traffic

---

## ⚡ Benchmarks (In-Memory, Sample)

| Algorithm      | Requests/sec | Avg Latency (ms) |
| -------------- | ------------ | ---------------- |
| Fixed Window   | 15,000       | 0.8              |
| Sliding Window | 14,000       | 0.9              |
| Token Bucket   | 13,500       | 1.0              |
| Leaky Bucket   | 13,200       | 1.1              |


---

## 🛠 Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch
3. Commit using conventional commits
4. Include tests where applicable
5. Submit a PR

---

## 📄 License

MIT © [Sudipto Das](https://github.com/sudip200)


