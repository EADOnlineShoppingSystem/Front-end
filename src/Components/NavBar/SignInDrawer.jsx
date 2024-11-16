import { LogIn, UserPlus, ShoppingBag, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import for navigation

const SignInPage = () => {
  const navigate = useNavigate(); // Get the navigation function

  const handleOrders = () => {
    navigate("/orders"); // Navigate to the orders page
  };

  const handleWish = () => {
    navigate("/wishlist"); // Navigate to the wishlist page
  };

  const handleProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen">
      <div className="w-full max-w-sm px-4 py-10 bg-white sm:px-6 lg:px-3 sm:py-16">
        <div>
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mr-2">
              Welcome!
            </h2>
            <span>
              <img src="/icons/hi.png" className="h-14" alt="Hi" />
            </span>
          </div>

          <form className="mt-2">
            <div className="space-y-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-500/50 ease-in-out border border-transparent rounded-3xl focus:outline-none hover:from-blue-500 hover:to-pink-500 focus:from-blue-500 focus:to-pink-500 transition-colors duration-700"
              >
                Sign in
              </button>
              <div className="flex items-center text-gray-900 justify-center opacity-70 hover:opacity-100">
                <a href="#">Register</a>{" "}
                {/* Changed to '#' for a placeholder */}
              </div>
            </div>
          </form>
          <div>
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <button
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleOrders}
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span>My Orders</span>
              </button>
              <button
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleWish}
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span>Wishlist</span>
              </button>
              <button
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleProfile}
              >
                <User className="w-5 h-5 text-gray-600" />
                <span>My Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
