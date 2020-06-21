const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = ({
    name: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    //address: {type: Schema.Types.ObjectId, ref: 'Address'}
})

module.exports = mongoose.model("User", UserSchema);