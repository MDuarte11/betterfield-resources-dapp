const { isCelebrateError } = require('celebrate')

function errorHandler(err, req, res, next) {
  console.log("Handling error", err.message)
  switch (true) {
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' });
    default:
      console.log('Unknown error:', err)
      return res.status(500).json({ message: err.message });
  }
}

module.exports = errorHandler