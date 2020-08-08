const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');
const verifyToken = require('../middlewares/verify-token');
const upload = require('../middlewares/upload-photo');

router.post('/reviews/:ProductID', [verifyToken, upload.single('photo')], async (req, res) => {
    try {
        const review = new Review();

        review.headline = req.body.headline;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.file.location;
        review.user = req.decoded._id;
        review.productID = req.params.ProductID;

        const savedReview = await review.save();

        if(savedReview) {

            await Product.update({ _id: req.params.ProductID }, { $push: { reviews: review._id }});

            res.json({
                success: true,
                message: "Successfuly Added Review"
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

router.get('/reviews/:ProductID', async(req, res) => {
    try {
        const ProductReviews = await Review.find({
            productID: req.params.ProductID
        }).populate('user').exec();

        res.json({
            success: true,
            reviews: ProductReviews
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })   
    }
});

module.exports = router;