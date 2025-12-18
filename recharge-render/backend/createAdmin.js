const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = {
      name: 'Super Admin',
      email: 'admin@recharge.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'admin',
      wallet: 100000,
      createdAt: new Date()
    };
    
    const User = require('./models/User');
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@recharge.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@recharge.com');
      console.log('🔑 Password: admin123');
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();