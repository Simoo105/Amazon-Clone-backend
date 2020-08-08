const mongoose = require('mongoose');
const schema = mongoose.Schema;

const HelpfulSchema = new schema ({
    user: { type: schema.Types.ObjectId, ref: 'User'},
    reviewID:  { type: schema.Types.ObjectId, ref: 'Review'}
});

module.exports = mongoose.model("Helpful", HelpfulSchema);