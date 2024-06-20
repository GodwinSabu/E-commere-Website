const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => { 
        console.log('fuck mongo');
        console.error('MongoDB connection error:', error.message);  
      }); 
} 
    
module.exports = connectDatabase