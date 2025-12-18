const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const User = require('./models/User');
    const admin = await User.findOne({ email: 'admin@recharge.com' }).select('-password');
    
    console.log('✅ Admin user found:');
    console.log('Name:', admin.name);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Wallet:', admin.wallet);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

verify();