const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const schema = mongoose.Schema;

const OrderSchema = new schema ({
    owner: { type: schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productID: { type: schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number
        }
    ],
    estimatedDelivery: String
});

OrderSchema.plugin(deepPopulate);

module.exports = mongoose.model("Order", OrderSchema);