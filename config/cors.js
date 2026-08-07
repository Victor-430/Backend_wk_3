const allowedOrigins =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      new Error(`CORS blocked ${origin} not allowed`);
    }
  },

  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials:true
};
