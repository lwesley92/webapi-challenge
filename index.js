const envReader = require('dotenv').config();
// Bringing in server.
const server = require('./server.js');

// Dynamic port.
const port = process.env.PORT || 5000

// server listening on dynamic port or LH:5000
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});