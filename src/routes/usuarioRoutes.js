const express = require('express');
const userController = require('../controllers/usuarioController');

const router = express.Router();

// Rota para buscar usuário pelo telefone
router.get('/:telefone', userController.getUserByTelefone);

// Rota para registrar batida de ponto
router.post('/bater-ponto', userController.registrarBatida);

router.get('/', userController.getAllUsers);

module.exports = router;
