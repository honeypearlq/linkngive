const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as necessary

app.post('/signup', async (req, res) => {
  const { name, emailOrPhone, password } = req.body;

  // Validation for input fields
  if (!name || !emailOrPhone || !password) {
    return res.status(400).json({ message: 'Please provide name, email/phone, and password.' });
  }

  // Check if the emailOrPhone is a valid email or phone
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^(09|\+639)\d{9}$/;

  if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
    return res.status(400).json({ message: 'Please provide a valid email or phone number.' });
  }

  try {
    // Check if the user already exists (by email or phone)
    const existingUser = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email: emailRegex.test(emailOrPhone) ? emailOrPhone : null,
      phone: phoneRegex.test(emailOrPhone) ? emailOrPhone : null,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error.message); // More detailed error log
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});