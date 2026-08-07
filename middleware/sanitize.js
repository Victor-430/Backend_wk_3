import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";

// export const sanitizeMongo = mongoSanitize({
//   replaceWith:"_",
//   sanitizeQuery:false
// });


// fix for use function to prevent error with mongosantize
export const sanitizeMongo = (req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body, { replaceWith: "_" });
  }
  next();
};

export const sanitizeXss = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  next();
};
