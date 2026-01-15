import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          {/* Empty cart illustration */}
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto border border-gray-700/50 shadow-2xl">
              <ShoppingBag className="w-16 h-16 text-gray-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-900/50 rounded-full flex items-center justify-center border border-red-700/50">
              <span className="text-red-400 text-lg">0</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any premium steaks yet. Browse our menu to find your perfect cut!
          </p>
          
          <button
            onClick={onContinueShopping}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg shadow-red-900/30 flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Browse Menu</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group justify-self-start"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center space-x-3">
          <ShoppingBag className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
          <span>Your Cart</span>
          <span className="text-sm bg-red-600 text-white px-2 py-1 rounded-full">{cartItems.length}</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-red-400 hover:text-red-300 transition-colors duration-200 text-sm font-medium justify-self-end"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-700/50">
        {cartItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`p-6 hover:bg-gray-800/50 transition-colors duration-200 ${
              index !== cartItems.length - 1 ? 'border-b border-gray-700/50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Item Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-gray-400 mb-1 flex items-center space-x-1">
                    <span className="text-amber-400">⚡</span>
                    <span>Size: {item.selectedVariation.name}</span>
                  </p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-gray-400 mb-1">
                    <span className="text-green-400">+</span> Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-bold text-red-400">₱{item.totalPrice} <span className="text-sm text-gray-500 font-normal">each</span></p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl p-1 border border-gray-600/50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-gray-300" />
                  </button>
                  <span className="font-bold text-white min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
                
                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <p className="text-lg font-bold text-white">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-200 border border-transparent hover:border-red-800/50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700/50">
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-gray-400">
            <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>Delivery Fee</span>
            <span className="text-green-400">Calculated at checkout</span>
          </div>
          <div className="h-px bg-gray-700/50"></div>
          <div className="flex items-center justify-between text-2xl font-bold">
            <span className="text-white">Total:</span>
            <span className="text-red-400">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-5 rounded-xl hover:from-red-500 hover:via-red-400 hover:to-red-500 transition-all duration-500 transform hover:scale-[1.02] font-bold text-lg shadow-2xl shadow-red-600/40 hover:shadow-red-500/50 flex items-center justify-center space-x-3 group border border-red-400/20"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          
          <span className="relative z-10 tracking-wide">Proceed to Checkout</span>
          <svg 
            className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        
        {/* Trust badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>🔒</span>
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>🚚</span>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>⭐</span>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;