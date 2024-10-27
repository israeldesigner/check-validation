const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: true, unique: true }, // Campo único
    local: { type: String, required: true },
    endereco: { type: String, required: true },
    batidas: {
        type: [{ 
            horario: { type: String, required: true },
            registrado_em: { type: Date, default: null },
            localizacao: { type: String, default: null },
            status: { 
                type: String, 
                enum: ['batido', 'não batido', 'perdido'], 
                default: 'não batido' 
            }
        }],
    }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
