const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OwnerSchema = new schema ({
    name: String,
    about: String,
    photo: String
});

module.exports = mongoose.model("Owner", OwnerSchema);