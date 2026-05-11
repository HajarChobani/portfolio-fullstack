import express from "express";
import http from "node:http";
import cors from "cors";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT || 3002;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
}));

app.use(express.json());

const rooms = new Map();
const users = new Map();

// Live chat memory
const roomMessages = new Map();
const waitingRooms = new Map();

function getHistory(roomId) {
    return roomMessages.get(roomId) || [];
}

function saveMessage(roomId, msg) {
    const history = getHistory(roomId);
    roomMessages.set(roomId, [...history, msg].slice(-100));
}

const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

// Test API
app.get("/", (req, res) => {
    res.send("API is running now");
});

// Create video room
app.post("/api/rooms", (req, res) => {
    const roomId = uuidv4();

    rooms.set(roomId, {
        id: roomId,
        participants: [],
        createdAt: new Date().toISOString(),
    });

    res.json({ roomId });
});

// Check video room
app.get("/api/rooms/:roomId", (req, res) => {
    const { roomId } = req.params;
    const room = rooms.get(roomId);

    if (!room) {
        return res.json({ exists: false });
    }

    res.json({
        exists: true,
        participants: room.participants,
    });
});

// Create / notify live chat room
app.post("/api/live-chat/notify", (req, res) => {
    const roomId = req.body?.roomId || uuidv4();
    const visitorName = req.body?.visitorName || "Visiteur portfolio";
    const pageUrl = req.body?.pageUrl || "";

    if (!waitingRooms.has(roomId)) {
        waitingRooms.set(roomId, {
            roomId,
            visitorName,
            pageUrl,
            status: "waiting",
            createdAt: new Date().toISOString(),
        });
    }

    io.emit("rooms-updated", [...waitingRooms.values()]);

    res.json({ ok: true, roomId });
});

// Get live chat rooms for admin
app.get("/api/live-chat/rooms", (req, res) => {
    res.json({
        rooms: [...waitingRooms.values()],
    });
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.emit("rooms-updated", [...waitingRooms.values()]);

    // Join room for video or live chat
    socket.on("join-room", ({ roomId, userId, userName, role }) => {
        socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.role = role || "user";

        socket.emit("history", getHistory(roomId));

        // For video room only
        if (userId && userName) {
            if (!rooms.has(roomId)) {
                rooms.set(roomId, {
                    id: roomId,
                    participants: [],
                    createdAt: new Date().toISOString(),
                });
            }

            const user = {
                id: userId,
                name: userName,
                socketId: socket.id,
            };

            users.set(socket.id, { ...user, roomId });

            const room = rooms.get(roomId);
            room.participants.push(user);

            socket.to(roomId).emit("user-joined", user);
            socket.emit("room-participants", room.participants);

            console.log(`${userName} joined room ${roomId}`);
        }
    });

    // Live chat message
    socket.on("message", (data) => {
        const roomId = data.roomId || socket.data.roomId;
        const text = (data.text || "").trim();
        const sender = data.sender || "visitor";

        if (!roomId || !text) return;

        const msg = {
            id: uuidv4(),
            roomId,
            text,
            sender,
            time: new Date().toISOString(),
        };

        saveMessage(roomId, msg);

        if (waitingRooms.has(roomId)) {
            const room = waitingRooms.get(roomId);
            room.lastMessageAt = msg.time;
            room.status = sender === "visitor" ? "waiting" : "active";
            waitingRooms.set(roomId, room);
        }

        io.to(roomId).emit("message", msg);
        io.emit("rooms-updated", [...waitingRooms.values()]);

        console.log(`[${sender}] ${text}`);
    });

    // WebRTC signaling
    socket.on("offer", ({ offer, roomId }) => {
        socket.to(roomId).emit("offer", {
            offer,
            fromUserId: socket.id,
        });
    });

    socket.on("answer", ({ answer, roomId }) => {
        socket.to(roomId).emit("answer", {
            answer,
            fromUserId: socket.id,
        });
    });

    socket.on("ice-candidate", ({ candidate, roomId }) => {
        socket.to(roomId).emit("ice-candidate", {
            candidate,
            fromUserId: socket.id,
        });
    });

    // Optional room chat for video page
    socket.on("chat-message", ({ roomId, message, userId, userName }) => {
        io.to(roomId).emit("chat-message", {
            id: uuidv4(),
            message,
            userId,
            userName,
            timestamp: new Date().toISOString(),
        });
    });

    socket.on("toggle-video", ({ roomId, userId, enabled }) => {
        socket.to(roomId).emit("user-video-toggled", { userId, enabled });
    });

    socket.on("toggle-audio", ({ roomId, userId, enabled }) => {
        socket.to(roomId).emit("user-audio-toggled", { userId, enabled });
    });

    socket.on("disconnect", () => {
        const user = users.get(socket.id);

        if (user) {
            const room = rooms.get(user.roomId);

            if (room) {
                room.participants = room.participants.filter(
                    (p) => p.id !== user.id
                );

                socket.to(user.roomId).emit("user-left", user);

                if (room.participants.length === 0) {
                    rooms.delete(user.roomId);
                }
            }

            users.delete(socket.id);
        }

        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});