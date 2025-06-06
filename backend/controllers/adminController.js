const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
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
 

exports.requestResetPassword = async(req, res) =>{
  const { email } = req.body

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Always return generic message for security
      return res.status(200).json({ message: "If the email exists, a reset link has been sent." });
    }

    // ✅ Generate JWT token instead of random string
    const resetToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: admin.email,
      subject: "Admin Password Reset",
      html: `
        <p>You requested a password reset</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent" });
  } catch (error) {
    console.error("Reset error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

exports.resetPassword = async(req, res) =>{
  const { token, newPassword } = req.body

  if(!token) return res.status(400).json({ message: "Token missing"})

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id)

    if(!admin) return res.status(404).json({ message: "Admin not found"})

    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(newPassword, salt)
    await admin.save()
    res.status(200).json({ message: "password reset successfull"})

  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "invalid or expired token "})
  }
}