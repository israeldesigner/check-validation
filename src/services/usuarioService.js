const Usuario = require('../models/usuarioModel');

exports.getAllUsers = async () => {
    try {
        const usuarios = await Usuario.find();
        return usuarios;
    } catch (error) {
        throw new Error(error.message);
    }
};

const atualizarStatusPerdido = async (usuario) => {
    const agora = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    usuario.batidas.forEach(batida => {
        const [hora, minuto] = batida.horario.split(":").map(Number);

        const horarioBatida = new Date();
        horarioBatida.setHours(hora, minuto, 0, 0);

        // Se o horário atual + 10 minutos for maior que o horário da batida e status ainda for "não batido"
        const limiteParaPerdido = new Date(horarioBatida.getTime() + 10 * 60 * 1000);
        if (agora > limiteParaPerdido && batida.status === "não batido") {
            batida.status = "perdido";
        }
    });

    await usuario.save();
};

// Função para buscar usuário pelo telefone e atualizar status das batidas para "perdido" se necessário
exports.getUserByTelefone = async (telefone) => {
    try {
        const usuario = await Usuario.findOne({ telefone });
        if (!usuario) throw new Error('Usuário não encontrado.');

        // Atualiza o status para "perdido" onde aplicável
        await atualizarStatusPerdido(usuario);

        return usuario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função de verificação de batida
const verificarBatida = (batidaHorario) => {
    // Hora atual em UTC-3
    const agora = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    // Extraindo a hora e o minuto do horário de batida
    const [hora, minuto] = batidaHorario.split(":").map(Number);

    // Define o horário exato da batida em UTC-3
    const horarioBatida = new Date();
    horarioBatida.setHours(hora, minuto, 0, 0);

    // Define o intervalo de 10 minutos antes e depois
    const intervaloInicio = new Date(horarioBatida.getTime() - 10 * 60 * 1000);
    const intervaloFim = new Date(horarioBatida.getTime() + 10 * 60 * 1000);

    return agora >= intervaloInicio && agora <= intervaloFim;
};

// Função para registrar batida pelo telefone
exports.registrarBatida = async (telefone, horario, localizacao) => {
    try {
        const usuario = await Usuario.findOne({ telefone });
        if (!usuario) throw new Error('Usuário não encontrado.');

        const batida = usuario.batidas.find(b => b.horario === horario);
        if (!batida) throw new Error('Horário de batida não encontrado.');

        if (verificarBatida(horario)) {
            batida.registrado_em = new Date(); // Data de registro
            batida.status = 'batido';
            batida.localizacao = localizacao;
            await usuario.save();
            return usuario;
        } else {
            return { message: 'Fora do intervalo permitido para a batida.' };
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
