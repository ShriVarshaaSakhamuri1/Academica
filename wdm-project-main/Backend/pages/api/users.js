import db from '../../lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const [rows] = await db.query('SELECT * FROM users');
            res.status(200).json(rows);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}