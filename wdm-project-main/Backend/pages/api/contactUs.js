import Cors from 'cors';
import nodemailer from 'nodemailer';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'], // Only allow POST and OPTIONS
  origin: '*', // Replace '*' with specific domains for better security
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subject, message, emailId, mobileNumber, name } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required' });
    }

    // Configure the transporter for nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: process.env.RECEIVER_EMAIL, // Receiver email address (your email)
      subject: `Contact Us: ${subject}`,
      text: `Contactors information:-
             Name:- ${name}
             Email Id:- ${emailId} 
             Mobile number:- ${mobileNumber}
             Message:- ${message}`,
    };

    

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
