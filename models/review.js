const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ReviewSchema = new schema ({
    headline: String,
    body: String,
    rating: Number,
    photo: String,
    productID: {type: schema.Types.ObjectId, ref: "Product"},
    user: {type: schema.Types.ObjectId, ref: "User"},
    helpfuls: [{type: schema.Types.ObjectId, ref: "Helpful"}]
});

module.exports = mongoose.model("Review", ReviewSchema);