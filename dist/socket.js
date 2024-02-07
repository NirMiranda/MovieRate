"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClient = void 0;
const xss = require("xss");
const handleClient = (io) => {
    io.on("connection", (socket) => {
        console.log("New WebSocket Connection...");
        socket.on("message", (message) => {
            console.log("message: ", message);
            const sanitizedMessage = xss.escapeHtml(message.message);
            io.emit("message", {
                message: sanitizedMessage,
                timestamp: message.timestamp
            });
        });
        socket.on("disconnect", () => {
            io.emit("message", "A user has left the chat");
            console.log("User has left the chat");
        });
    });
};
exports.handleClient = handleClient;
module.exports = { handleClient: exports.handleClient };
//# sourceMappingURL=socket.js.map