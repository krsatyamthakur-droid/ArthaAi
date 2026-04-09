const serverless = require('serverless-http');
const app = require('../../backend/index');

// Wrap the Express app and export it as a Netlify handler
module.exports.handler = serverless(app);
