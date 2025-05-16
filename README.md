# Super Rate Limiter 🚀

[![npm version](https://img.shields.io/npm/v/super-rate-limiter)](https://www.npmjs.com/package/super-rate-limiter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A flexible, production-ready rate limiting middleware for Express.js with multiple algorithms and storage options.

---

## ✨ Features

* 🎯 **Multiple Algorithms**

  * ✅ Fixed Window
  * 🕒 Sliding Window *(coming soon)*
  * 🪣 Token Bucket *(coming soon)*
  * 💧 Leaky Bucket *(coming soon)*

* 💾 **Storage Backends**

  * In-Memory (single instance)
  * Redis (distributed environments)

* 🔑 **Flexible Key Generation**

  * Based on IP, API keys, user sessions, or custom extractors

* ⚡ **High Performance**: Minimal latency overhead

* 🛡️ **Type Safety**: Fully written in TypeScript

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
  algorithm: 'fixed-window',
  storeType: 'redis',
  maxRequests: 10,
  windowSizeInMS: 60 * 1000,
  keyExtractor: (req) => req.headers['api-key'] as string,
}));
```



---

## 📚 API Reference

### `superRateLimiter(options: RateLimiterOptions)`

| Parameter        | Type                                      | Required | Description                                 |
| ---------------- | ----------------------------------------- | -------- | ------------------------------------------- |
| `algorithm`      | `"fixed-window"` \| `"token-bucket"` etc. | ✅        | Algorithm to use                            |
| `storeType`      | `"in-memory"` \| `"redis"`                | ✅        | Storage backend type                        |
| `maxRequests`    | `number`                                  | ✅\*      | Max requests per window                     |
| `windowSizeInMS` | `number`                                  | ✅\*      | Time window duration in milliseconds        |
| `keyExtractor`   | `(req: Request) => string`                | ❌        | Custom key generator (defaults to `req.ip`) |


> \*Required for `fixed-window` and similar algorithms.

---

## 🤓 Algorithms Explained

### 1. **Fixed Window**

* Maintains a simple counter per key per window
* Resets at fixed intervals
* **Example**: “100 requests per minute”

> ✅ Simple, fast, memory-efficient
> ❌ Allows spikes near boundary transitions

---

## ⚡ Benchmarks (Sample)

| Algorithm    | Requests/sec | Avg Latency (ms) |
| ------------ | ------------ | ---------------- |
| Fixed Window | 15,000       | 0.8              |
| In-memory    | 18,000       | 0.5              |

*(Add more once other algorithms are implemented.)*

---

## 🛠 Contributing

Contributions are welcome!
To get started:

1. **Fork** this repo
2. **Create a feature branch**
3. **Submit a pull request (PR)**

Please follow conventional commits and include tests where applicable.

---

## 📄 License

MIT © [Sudipto Das](https://github.com/sudip200)

---

## 🔮 Roadmap

* [ ] Add Token Bucket support
* [ ] Add Sliding Window support
* [ ] Add Leaky Bucket support
* [ ] Add CLI for testing rate limits
* [ ] Add Prometheus metrics support


