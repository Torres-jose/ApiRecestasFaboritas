require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, () =>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});

