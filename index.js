const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./src/routes/usuarioRoutes');
const cors = require('cors'); // Importa o pacote cors
require('dotenv').config();

const app = express();

// Habilita o CORS para permitir acessos da origem do seu projeto Expo
app.use(cors({
    origin: 'http://localhost:8081' // Ajuste para a porta correta do Expo, se necessário
}));

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
