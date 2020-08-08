const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema ({
    type: {type: String, unique:true, required: true}
});

module.exports = mongoose.model("Category", CategorySchema);