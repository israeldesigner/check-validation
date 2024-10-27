const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log("Conectado ao banco de dados.")
        mongoose.Promise = global.Promise;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
