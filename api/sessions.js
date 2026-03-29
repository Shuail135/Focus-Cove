import { getPool } from "./db.js";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { user_id, duration_minutes, session_date } = req.body || {};

        if (!user_id || !duration_minutes) {
            return res.status(400).json({ error: "user_id and duration_minutes are required" });
        }

        const pool = getPool();

        const [result] = await pool.query(
            `INSERT INTO study_sessions (user_id, duration_minutes, session_date)
       VALUES (?, ?, ?)`,
            [
                user_id,
                duration_minutes,
                session_date || new Date().toISOString().slice(0, 10),
            ]
        );

        return res.status(200).json({
            message: "Session created",
            session_id: result.insertId,
        });
    } catch (error) {
        console.error("Sessions API error:", error);
        return res.status(500).json({
            error: "Failed to create session",
            detail: error.message,
        });
    }
}