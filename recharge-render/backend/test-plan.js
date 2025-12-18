try {
  const Plan = require('./models/Plan');
  console.log('✅ Plan model loaded successfully');
} catch (err) {
  console.error('❌ Error loading Plan model:', err.message);
}
