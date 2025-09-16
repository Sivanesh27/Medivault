import React, { useState } from 'react';

function Pharmacy() {
  const [cart, setCart] = useState([]);
  const medicines = ["Paracetamol", "Amoxicillin", "Vitamin D", "Ibuprofen"];

  const addToCart = (med) => {
    setCart([...cart, med]);
  };

  const removeFromCart = (med) => {
    setCart(cart.filter(item => item !== med));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-4">
          Online Pharmacy
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Browse and add medicines to your cart with ease.
        </p>

        {/* Medicines List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {medicines.map((med, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <span className="text-lg font-medium text-gray-800">{med}</span>
              <button
                onClick={() => addToCart(med)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="bg-green-50 rounded-xl p-6 shadow-inner">
          <h3 className="text-2xl font-bold text-green-700 mb-4">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((med, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
                >
                  <span className="text-gray-700">{med}</span>
                  <button
                    onClick={() => removeFromCart(med)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pharmacy;
