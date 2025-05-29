const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

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