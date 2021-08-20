const rateLimit = require("express-rate-limit");
const config = require("../../../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.setup = function (app) {
  console.log("Setting up routes.");

  // https://jwt.io/introduction/
  const jwt = require("express-jwt");

  app.use(
    "/api/v1",
    (req, res, next) => {
      next();
    },
    jwt({
      secret: config.jwtSecret,
      algorithms: ["sha1", "RS256", "HS256"],
    }).unless({
      path: ["/api/v1/agoratoken"],
    })
  );

  const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000 * 20, // 15 minutes
    max: 20000,
    message: "You have exceeded the 100 requests in 24 hrs limit!",
    headers: true,
  });

  const agoratoken = require("./agoratoken");

  app.use("/api/v1/agoratoken", apiLimiter, agoratoken);
};

module.exports = exports;
