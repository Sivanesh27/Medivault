// A mock database of medicines
const MEDICINE_INVENTORY = [
    { id: 'med1', name: 'Paracetamol 500mg', price: 5.99, stock: 150 },
    { id: 'med2', name: 'Amoxicillin 250mg', price: 12.50, stock: 80 },
    { id: 'med3', name: 'Vitamin D 1000 IU', price: 8.99, stock: 200 },
    { id: 'med4', name: 'Ibuprofen 200mg', price: 7.25, stock: 120 },
    { id: 'med5', name: 'Cetirizine 10mg', price: 9.99, stock: 95 },
    { id: 'med6', name: 'Loratadine 10mg', price: 11.49, stock: 70 },
];

// @desc    Get all available medicines
// @route   GET /api/pharmacy/medicines
exports.getMedicines = (req, res) => {
    res.json(MEDICINE_INVENTORY);
};

// @desc    Place a new order
// @route   POST /api/pharmacy/order
exports.placeOrder = (req, res) => {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ message: 'Cannot place an empty order.' });
    }

    // In a real application, you would:
    // 1. Verify stock levels.
    // 2. Process payment through a gateway.
    // 3. Create an order record in the database.
    // 4. Decrease stock levels.
    console.log('New order received for user:', req.user.id, 'Items:', cart);

    res.status(201).json({ message: 'Order placed successfully! You will receive a confirmation email shortly.' });
};
