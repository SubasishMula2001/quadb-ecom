const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart);
};

const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (product) {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const removeItemFromCart = async (req, res) => {
    const { id } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
        cart.items = cart.items.filter(item => item._id.toString() !== id);
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

module.exports = { getCart, addItemToCart, removeItemFromCart };
