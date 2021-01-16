const http = require("http");
const config = require("./config");
const app = require("./app");
const { PORT } = require("./config");

const server = http.createServer(app);

server.listen(PORT, () => console.log("Server running on port " + PORT));
