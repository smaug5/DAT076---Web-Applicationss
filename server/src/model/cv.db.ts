const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
    { pdf: String },
    { collection: 'cv' }

);

mongoose.model('cv', cvSchema);