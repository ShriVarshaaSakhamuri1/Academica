import db from '../../lib/db'; // Database connection
import Cors from 'cors';
import bcrypt from 'bcrypt'; // For encrypting and decrypting passwords

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Allow only specific methods
  origin: '*', // Replace '*' with specific domains for security
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

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, oldPassword, newPassword } = req.body;

    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch user password from the database
    const [result] = await db.query(
      'SELECT password FROM users WHERE user_id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const storedPassword = result[0].password;

    // Compare the provided oldPassword with the stored password
    const isMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await db.query(
      'UPDATE users SET password = ? WHERE user_id = ?',
      [hashedPassword, id]
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
