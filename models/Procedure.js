const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    ecu_type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    procedure_script: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Procedure', procedureSchema);
