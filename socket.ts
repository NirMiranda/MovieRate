const xss = require("xss");

export const handleClient = (io: any) => {
    io.on("connection", (socket: any) => {
        console.log("New WebSocket Connection...");

        socket.on("message", (message: any) => {
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

module.exports = { handleClient };
