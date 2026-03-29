const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
});

db.connect((err) => {
    if (err) {
        console.error("DB connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post("/users", (req, res) => {
    const { device_id } = req.body;

    if (!device_id) {
        return res.status(400).json({ error: "device_id is required" });
    }

    const findQuery = "SELECT * FROM users WHERE device_id = ?";

    db.query(findQuery, [device_id], (err, results) => {
        if (err) {
            console.error("Find user error:", err);
            return res.status(500).json({ error: "Failed to find user" });
        }

        if (results.length > 0) {
            return res.json(results[0]);
        }

        const insertQuery = "INSERT INTO users (device_id) VALUES (?)";

        db.query(insertQuery, [device_id], (err, result) => {
            if (err) {
                console.error("Create user error:", err);
                return res.status(500).json({ error: "Failed to create user" });
            }

            db.query(
                "SELECT * FROM users WHERE user_id = ?",
                [result.insertId],
                (err, newUser) => {
                    if (err) {
                        console.error("Fetch new user error:", err);
                        return res.status(500).json({ error: "Failed to fetch new user" });
                    }

                    res.json(newUser[0]);
                }
            );
        });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.post("/sessions", (req, res) => {
    const { user_id, duration_minutes } = req.body;

    if (!user_id || !duration_minutes) {
        return res.status(400).json({ error: "user_id and duration_minutes are required" });
    }

    const query = `
        INSERT INTO study_sessions (user_id, session_date, duration_minutes)
        VALUES (?, CURDATE(), ?)
    `;

    db.query(query, [user_id, duration_minutes], (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Failed to save session" });
        }

        res.json({
            message: "Session saved successfully",
            sessionId: result.insertId,
        });
    });
});

app.get("/sessions/today/:userId", (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT COUNT(*) AS total_sessions,
               COALESCE(SUM(duration_minutes), 0) AS total_minutes
        FROM study_sessions
        WHERE user_id = ?
          AND session_date = CURDATE()
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Fetch today sessions error:", err);
            return res.status(500).json({ error: "Failed to fetch today's sessions" });
        }

        res.json(results[0]);
    });
});

app.get("/progress/:userId", (req, res) => {
    const { userId } = req.params;

    const totalQuery = `
        SELECT 
            COUNT(*) AS sessions,
            COALESCE(SUM(duration_minutes), 0) AS totalMinutes
        FROM study_sessions
        WHERE user_id = ?
    `;

    const last7DaysQuery = `
        SELECT 
            session_date,
            COALESCE(SUM(duration_minutes), 0) AS minutes
        FROM study_sessions
        WHERE user_id = ?
          AND session_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY session_date
        ORDER BY session_date ASC
    `;

    db.query(totalQuery, [userId], (err, totalResults) => {
        if (err) {
            console.error("Total progress error:", err);
            return res.status(500).json({ error: "Failed to fetch progress totals" });
        }

        db.query(last7DaysQuery, [userId], (err, last7Results) => {
            if (err) {
                console.error("Last 7 days error:", err);
                return res.status(500).json({ error: "Failed to fetch last 7 days progress" });
            }

            const today = new Date();
            const last7Days = [];

            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(today.getDate() - i);
                const dateStr = d.toISOString().split("T")[0];

                const found = last7Results.find(
                    (row) => new Date(row.session_date).toISOString().split("T")[0] === dateStr
                );

                last7Days.push(found ? Number(found.minutes) : 0);
            }

            // Simple streak calculation
            let streak = 0;
            for (let i = last7Days.length - 1; i >= 0; i--) {
                if (last7Days[i] > 0) {
                    streak++;
                } else {
                    break;
                }
            }

            res.json({
                sessions: Number(totalResults[0].sessions) || 0,
                totalMinutes: Number(totalResults[0].totalMinutes) || 0,
                streak,
                bestStreak: streak, // temporary simple version
                last7Days,
            });
        });
    });
});