import mysql from "mysql2/promise";

let pool;

export function getPool() {
    if (!pool) {
        const useStrictSSL = !!process.env.DB_SSL_CA;

        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            ssl: useStrictSSL
                ? {
                    ca: process.env.DB_SSL_CA,
                    rejectUnauthorized: true,
                }
                : {
                    rejectUnauthorized: false,
                },
        });
    }

    return pool;
}