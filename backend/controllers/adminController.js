const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.devLogin = (req, res) => {
  const { devKey } = req.body;

  if (devKey !== process.env.DEV_SECRET_KEY) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = jwt.sign(
    { adminId: 'dev-access', role: 'developer' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
}; 

exports.requestResetPassword = async(req, res) =>{
  const { email } = req.body

  try {
    const admin = Admin.findOne({ email})
    if(!admin) {
      res.status(200).json({ message: "if the email exists, a reset link has been sent."})
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const tokenExpiry = Date.now() + 3600000

    admin.resetToken = resetToken
    admin.resetTokenExpiry = tokenExpiry

    await admin.save()

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }

    })

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
    const mailOptions = {
      to: admin.email,
      subject: "Admin password Reset",
      html:`
        <p>You requested a password reset</p>
        <p><a href="${resetUrl}">Click here to reset</a></p>
        <p>This link will expire in 1 hour.</p>
      `
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: "Reset link sent"})
  } catch (error) {
    console.error("Reset error", err)
    res.status(500).json({ error: "Something went wrong "})
  }
}