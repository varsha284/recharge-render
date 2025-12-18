try { 
  const auth = require('./routes/auth'); 
  console.log('✅ Auth route loaded successfully'); 
} catch (err) { 
  console.error('❌ Error loading auth:', err.message); 
  console.error('Error stack:', err.stack);
}
