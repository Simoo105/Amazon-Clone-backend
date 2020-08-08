const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');//middleware
// POST request - Create a new Product
router.post('/products', upload.single('photo'), async (req, res) =>{
    try {
        let product = new Product();
        product.title = req.body.title;
        product.category = req.body.categoryID,
        product.owner = req.body.ownerID,
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({
            success: true,
            message: 'Successfully saved'
        })
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});
// GET request - get a all Product

router.get('/products', async (req, res) => {
    try {
        let products = await Product.find()
            .populate('owner category')
            .populate('reviews', 'rating')
            .exec();
        res.json({
            success: true,
            products: products
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - get a single Product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id})
        .populate('owner category')
        .populate('reviews', 'rating')
        .exec();
        if(product) {
            res.json({
                success: true,
                product: product
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// PUT request - Update a single Product
router.put('/products/:id', upload.single('photo'), async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id});

        product.title = req.body.title;
        product.category = req.body.categoryID,
        product.owner = req.body.ownerID,
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({
            success: true,
            updatedProduct: product
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
// DELETE request - Delete a single Product
router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findByIdAndDelete({_id: req.params.id});
        if(deletedProduct) {
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
        });
    }
})

module.exports = router;