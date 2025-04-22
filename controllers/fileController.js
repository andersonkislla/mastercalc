const fs = require('fs');
const Procedure = require('../models/Procedure');
const runScript = require('../utils/scriptRunner');

// Processa o arquivo com o procedimento salvo no banco
exports.processFile = async (req, res) => {
    try {
        const { brand, ecu_type, title } = req.body;
        const fileBuffer = fs.readFileSync(req.file.path);

        const procedure = await Procedure.findOne({ brand, ecu_type, title });
        if (!procedure) return res.status(404).json({ error: 'Procedimento não encontrado' });

        const modifiedBuffer = await runScript(fileBuffer, procedure.procedure_script);

        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${req.file.originalname.replace(/\.[^/.]+$/, '')}_modificado.bin`,
        });

        return res.send(modifiedBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
};

// Cadastra um novo procedimento
exports.addProcedure = async (req, res) => {
    try {
        const { brand, ecu_type, title, description, procedure_script } = req.body;

        const existing = await Procedure.findOne({ brand, ecu_type, title });
        if (existing) {
            return res.status(400).json({ error: 'Já existe um procedimento com esse título, marca e tipo de ECU.' });
        }

        const newProcedure = new Procedure({
            brand,
            ecu_type,
            title,
            description,
            procedure_script
        });

        await newProcedure.save();
        res.status(201).json({ message: 'Procedimento adicionado com sucesso!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar o procedimento.' });
    }
};
