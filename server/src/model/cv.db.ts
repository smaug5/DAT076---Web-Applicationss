const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
    { pdf: String },
    { collection: 'cv' }

);

const CV = mongoose.model('cv', cvSchema);

