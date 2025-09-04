// File: pages/api/getSchools.js

import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // --- THIS IS THE CRITICAL LINE ---
    // Ensure the SQL query selects the 'image' column
    const [rows] = await connection.execute(
      'SELECT id, name, address, city, image FROM schools'
    );
    
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching schools', error: error.message });
  }
}