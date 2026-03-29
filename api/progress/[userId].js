import { getPool } from "../db.js";

export default async function handler(req, res) {
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

        const [totals] = await pool.query(
            `SELECT COUNT(*) AS sessions,
              COALESCE(SUM(duration_minutes), 0) AS totalMinutes
       FROM study_sessions
       WHERE user_id = ?`,
            [userId]
        );

        const [last7] = await pool.query(
            `SELECT session_date,
              COALESCE(SUM(duration_minutes), 0) AS minutes
       FROM study_sessions
       WHERE user_id = ?
         AND session_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY session_date
       ORDER BY session_date ASC`,
            [userId]
        );

        const today = new Date();
        const last7Days = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);

            const found = last7.find((row) => {
                const rowDate = new Date(row.session_date).toISOString().slice(0, 10);
                return rowDate === dateStr;
            });

            last7Days.push(found ? Number(found.minutes) : 0);
        }

        let streak = 0;
        for (let i = last7Days.length - 1; i >= 0; i--) {
            if (last7Days[i] > 0) streak++;
            else break;
        }

        return res.status(200).json({
            sessions: Number(totals[0].sessions) || 0,
            totalMinutes: Number(totals[0].totalMinutes) || 0,
            streak,
            bestStreak: streak,
            last7Days,
        });
    } catch (error) {
        console.error("Progress API error:", error);
        return res.status(500).json({
            error: "Failed to fetch progress",
            detail: error.message,
        });
    }
}