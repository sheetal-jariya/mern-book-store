
import { useCart } from "../context/CartContext";

const SERVER_URL = "http://localhost:8080";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center shadow-sm">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems
              .filter((item) => item !== null)
              .map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={`${SERVER_URL}${item.bookImage}`}
                    alt={item.bookName}
                    className="w-24 h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      by <span className="italic">{item.bookAuthor}</span>
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{item.bookPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}

            <div className="text-right mt-10">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-orange-600 transition duration-300">
                Proceed to Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;


