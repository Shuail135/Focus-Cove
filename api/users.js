const { getPool } = require("./db");

module.exports = async (req, res) => {
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
        const { device_id } = req.body;

        if (!device_id) {
            return res.status(400).json({ error: "device_id is required" });
        }

        const pool = getPool();

        const [existing] = await pool.query(
            "SELECT * FROM users WHERE device_id = ? LIMIT 1",
            [device_id]
        );

        if (existing.length > 0) {
            return res.status(200).json(existing[0]);
        }

        const [result] = await pool.query(
            "INSERT INTO users (device_id) VALUES (?)",
            [device_id]
        );

        const [newUser] = await pool.query(
            "SELECT * FROM users WHERE user_id = ? LIMIT 1",
            [result.insertId]
        );

        return res.status(200).json(newUser[0]);
    } catch (error) {
        console.error("Users API error:", error);
        return res.status(500).json({ error: "Failed to get or create user" });
    }
};