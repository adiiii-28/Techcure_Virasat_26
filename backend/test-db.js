require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techcure_virasat');
    
    console.log('✅ MongoDB Connected: ' + conn.connection.host);
    console.log('📊 Database: ' + conn.connection.name);
    console.log('🔗 Connection State: ' + conn.connection.readyState);
    
    // Test database operations
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('📁 Collections: ' + collections.length);
    
    collections.forEach(collection => {
      console.log('   - ' + collection.name);
    });
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}

testConnection();
