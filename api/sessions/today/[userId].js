const { getPool } = require("../../db");

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { userId } = req.query;
        const pool = getPool();

        const [rows] = await pool.query(
            `SELECT COUNT(*) AS total_sessions,
              COALESCE(SUM(duration_minutes), 0) AS total_minutes
       FROM study_sessions
       WHERE user_id = ?
         AND session_date = CURDATE()`,
            [userId]
        );

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Today sessions API error:", error);
        return res.status(500).json({ error: "Failed to fetch today's sessions" });
    }
};