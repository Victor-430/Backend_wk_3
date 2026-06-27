import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
    windowMs:60 * 1000,
    limit:100,
    message:"Too many request",
    standardHeaders: true,
    legacyHeaders: false

})

export const authRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: {message: "Too many login attempt"},
    legacyHeaders: false
})