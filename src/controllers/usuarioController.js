const UserService = require('../services/usuarioService');

exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await UserService.getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para buscar usuário pelo telefone
exports.getUserByTelefone = async (req, res) => {
    try {
        const telefone = req.params.telefone;
        const usuario = await UserService.getUserByTelefone(telefone);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Controlador para registrar batida de ponto pelo telefone e horário
exports.registrarBatida = async (req, res) => {
    try {
        const { telefone, horario, localizacao } = req.body;
        const resultado = await UserService.registrarBatida(telefone, horario, localizacao);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
