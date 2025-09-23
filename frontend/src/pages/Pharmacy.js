import React, { useState, useEffect } from 'react';

function Pharmacy() {
    const [medicines, setMedicines] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        const fetchMedicines = async () => {
            const token = localStorage.getItem('userToken');
            try {
                const res = await fetch('http://localhost:5000/api/pharmacy/medicines', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Failed to fetch medicines.');
                const data = await res.json();
                setMedicines(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, []);

    const addToCart = (med) => {
        setOrderStatus(''); // Clear previous order status
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === med.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...med, quantity: 1 }];
        });
    };

    const removeFromCart = (medId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== medId));
    };
    
    const updateQuantity = (medId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(medId);
            return;
        }
        setCart(prevCart => prevCart.map(item => item.id === medId ? { ...item, quantity: newQuantity } : item));
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;
        setLoading(true);
        setError('');
        setOrderStatus('Placing order...');
        
        const token = localStorage.getItem('userToken');
        try {
            const res = await fetch('http://localhost:5000/api/pharmacy/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to place order.');

            setOrderStatus(data.message);
            setCart([]); // Clear cart on successful order
        } catch(err) {
            setError(err.message);
            setOrderStatus('');
        } finally {
            setLoading(false);
        }
    }

    if (loading && medicines.length === 0) return <div className="text-center p-10">Loading Pharmacy...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-green-700 text-center mb-4">Online Pharmacy</h1>
                <p className="text-center text-gray-600 mb-10">Browse available medicines and place your order online.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Medicines List */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {medicines.map((med) => (
                                <div key={med.id} className="bg-white flex flex-col justify-between border rounded-xl p-4 shadow hover:shadow-lg transition">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{med.name}</h3>
                                        <p className="text-green-600 font-semibold text-xl my-2">${med.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">{med.stock > 0 ? `${med.stock} in stock` : 'Out of stock'}</p>
                                    </div>
                                    <button onClick={() => addToCart(med)} disabled={med.stock <= 0} className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400">
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart */}
                    <div className="lg:col-span-1">
                        <div className="bg-green-50 rounded-xl p-6 shadow-inner sticky top-10">
                            <h3 className="text-2xl font-bold text-green-700 mb-4">Your Cart</h3>
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                <>
                                    <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                        {cart.map((item) => (
                                            <li key={item.id} className="bg-white p-3 rounded-lg shadow-sm">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-gray-700">{item.name}</p>
                                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                     <label className="text-sm">Qty:</label>
                                                     <input 
                                                        type="number" 
                                                        value={item.quantity} 
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                        className="w-16 p-1 border rounded"
                                                        min="1"
                                                     />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t mt-4 pt-4">
                                        <div className="flex justify-between font-bold text-lg text-green-800">
                                            <span>Total:</span>
                                            <span>${calculateTotal()}</span>
                                        </div>
                                        <button onClick={handlePlaceOrder} disabled={loading} className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl shadow-md hover:bg-green-800 font-semibold disabled:bg-green-400">
                                            {loading ? 'Processing...' : 'Place Order'}
                                        </button>
                                         {(orderStatus || error) && (
                                            <p className={`text-center mt-4 p-2 rounded-lg ${error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {error || orderStatus}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pharmacy;

