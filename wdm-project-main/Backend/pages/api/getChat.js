import db from '../../lib/db';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  origin: '*', // Allow all origins, you can specify specific origins as well
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {

    await runMiddleware(req, res, cors);

    const { group_id } = req.query;

    try {
        if (req.method === 'GET') {
            const [rows] = await db.query(
                `SELECT forum_posts.post_id, forum_posts.group_id, forum_posts.title, forum_posts.content, forum_posts.created_at, users.*
                 FROM forum_posts
                 INNER JOIN users ON forum_posts.user_id = users.user_id
                 WHERE forum_posts.group_id = ?
                 ORDER BY forum_posts.created_at ASC`,
                [group_id]
              );
            res.status(200).json(rows);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}