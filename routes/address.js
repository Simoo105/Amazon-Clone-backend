const router = require('express').Router();
const Address = require('../models/address');
const User = require('../models/user');
const verifyToken = require('../middlewares/verify-token');
const axios = require('axios');

router.post('/addresses', verifyToken, async (req,res) => {
    try {
        let address = new Address();

        address.user = req.decoded._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zipCode = req.body.zipCode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliveryInstructions = req.body.deliveryInstructions;
        address.securityCode = req.body.securityCode;

        await address.save();

        res.json({
            success: true,
            message: "Successfully added an address"
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.get('/addresses', verifyToken, async (req,res) => {
    try {
        let addresses = await Address.find({user: req.decoded})

        res.json({
            success: true,
            addresses: addresses
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.get('/addresses/:id', verifyToken, async (req,res) => {
    try {
        let address = await Address.findOne({_id: req.params.id, user: req.decoded._id})

        res.json({
            success: true,
            address: address
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.get('/countries', async (req, res) => {
    try {
        let response = await axios.get('https://restcountries.eu/rest/v2/all');
        res.json(response.data);
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.put('/addresses/:id', verifyToken, async (req,res) => {
    try {
        let address = await Address.findOne({_id: req.params.id, user: req.decoded._id});

        if(address) {
            if(req.body.country) address.country = req.body.country;
            if(req.body.fullName) address.fullName = req.body.fullName;
            if(req.body.streetAddress) address.streetAddress = req.body.streetAddress;
            if(req.body.city) address.city = req.body.city;
            if(req.body.state) address.state = req.body.state;
            if(req.body.zipCode) address.zipCode = req.body.zipCode;
            if(req.body.phoneNumber) address.phoneNumber = req.body.phoneNumber;
            if(req.body.deliveryInstructions) address.deliveryInstructions = req.body.deliveryInstructions;
            if(req.body.securityCode) address.securityCode = req.body.securityCode;

            await address.save();

            res.json({
                success: true,
                message: 'Successfully updated'
            });
        }
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.delete('/addresses/:id', verifyToken, async (req, res) => {
    try {
        let deletedAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id });
        if(deletedAddress) {
            res.json({
                success: true,
                message: 'Successfully deleted'
            })
        }
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.put('/addresses/set/default', verifyToken, async (req,res) => {
    try {
        let doc = await User.findOneAndUpdate({ _id: req.decoded._id }, { $set: { address : req.body.id }});

        if(doc) {
            await doc.save();

            res.json({
                success: true,
                message: 'Successfully set this address as default'
            });
        }
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;