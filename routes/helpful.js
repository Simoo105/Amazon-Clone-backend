const router = require('express').Router();
const Review = require('../models/review');
const Helpful = require('../models/helpful');
const verifyToken = require('../middlewares/verify-token');

router.post('/helpful/:reviewID', verifyToken, async (req, res) => 
{
    try {
        let AlreadyHelpful = await Helpful.findOne({
            user: req.decoded._id,
            reviewID: req.params.reviewID
        });
        if(! AlreadyHelpful) {
            let helpful = new Helpful();

            helpful.user = req.decoded._id;
            helpful.reviewID = req.params.reviewID;
        
            const savedHelpful = await helpful.save();
        
            if(savedHelpful) {

                await Review.update({ _id: req.params.reviewID }, {$push: { helpfuls:  helpful._id} })

                res.json({
                    success: true,
                    savedHelpful: savedHelpful,
                    message: "Successfuly make it helpful"
                })
            }
        } 
        else {
            res.status(403).json({
                success: false,
                message: "You already found it helpful"
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

router.get('/helpful/:reviewID', verifyToken, async (req, res) => 
{
    try {
        let AlreadyHelpful = await Helpful.findOne({
            user: req.decoded._id,
            reviewID: req.params.reviewID
        });
    
        if(AlreadyHelpful) {
            res.json({
                success: true,
                help: AlreadyHelpful
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: " Not found "
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

module.exports = router;