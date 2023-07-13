require('dotenv').config();

function authenticateAPIKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.sendStatus(401); // Unauthorized
  }

  next();
}

module.exports = authenticateAPIKey;