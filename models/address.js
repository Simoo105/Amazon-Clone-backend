const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AddressSchema = new schema ({
    user: {type: schema.Types.ObjectId, ref: 'User'},
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: Number,
    phoneNumber: String,
    deliveryInstructions: String,
    securityCode: String
});

module.exports = mongoose.model("Address", AddressSchema);