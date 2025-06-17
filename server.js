const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // ✅ Missing import
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

const image = "./images/eduTechB.png"
console.log(image);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// ✅ Contact Form Route
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('📩 Contact request received:', { name, email, message });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crimechronicles13@gmail.com',
            pass: 'pusp perw uyzz fovt',
        },
    });

    const ownerMailOptions = {
        from: email,
        to: 'crimechronicles13@gmail.com',
        subject: 'New Contact Form Submission',
        html: `
            <h3>New message from your website</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `,
    };

    const userMailOptions = {
        from: 'crimechronicles13@gmail.com',
        to: email,
        subject: 'Thank You for Contacting Us',
        html: `
  <div style="background-color: #000; border-radius: 10px; padding: 20px; max-width: 900px; margin: auto; color: white; font-family: Arial, sans-serif; text-align: center;">
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/35kWyBZk/Edu-Tech-Logo.png" alt="Edu Tech Logo" border="0" style="height: 100px;width:100px; border-radius: 50%;"></a>
    <h2 style="color: #bd34fe;">EDUTech</h2>

    <h3 style="color: white;">Hi ${name},</h3>
    <p style="color: #eee; font-size: 16px;">
      Thank you for contacting us. We’ve received your message and will get back to you soon.
    </p>

    <div style="background-color: #111; border: 1px solid #444; border-radius: 8px; padding: 10px; margin: 20px auto;">
      <p style="color: #ccc;"><strong>Your Message:</strong></p>
      <p style="color: #bbb;">${message}</p>
    </div>

    <hr style="margin: 20px 0; border: 1px solid rgba(255,255,255,0.1);" />

    <p style="font-size: 14px; color: #888;">
      – EDU Tech Team<br/>
      <small style="font-size: 12px;">EDUTech | Learn. Grow. Succeed.</small>
    </p>
  </div>
`
    };

    try {
        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// ✅ DB connection (can remain as-is)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Default test route
app.get('/', (req, res) => {
    res.send('EduTech API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
