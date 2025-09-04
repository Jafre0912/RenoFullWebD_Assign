// File: pages/api/addSchool.js

import mysql from 'mysql2/promise';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const uniqueFilename = `${Date.now()}_${file.originalFilename}`;
  const newPath = path.join(uploadDir, uniqueFilename);
  fs.renameSync(file.filepath, newPath);
  return `/schoolImages/${uniqueFilename}`;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Form parsing error', error: err.message });
    }

    let connection;
    try {
      const imageFile = files.image ? files.image[0] : null;
      let imagePath = null;

      if (imageFile) {
        imagePath = await saveFile(imageFile);
      }

      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      const name = fields.name[0];
      const address = fields.address[0];
      const city = fields.city[0];
      const state = fields.state[0];
      const contact = fields.contact[0];
      const email_id = fields.email_id[0];

      const [result] = await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, imagePath, email_id]
      );
      
      await connection.end();
      return res.status(201).json({ message: 'School added successfully!', id: result.insertId });

    } catch (error) {
      if (connection) await connection.end();
      console.error('Database or file error:', error);
      return res.status(500).json({ message: 'Error adding school', error: error.message });
    }
  });
}