import {
  ShoppingBag,
  Heart,
  User,
  MapPin,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInDrawer = ({ onAuthAction }) => {
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleWish = () => {
    navigate("/wishlist");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleAddresses = () => {
    navigate("/address");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center bg-white h-full">
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

          <div className="mt-2">
            <div className="space-y-2">
              <button
                onClick={() => onAuthAction("signin")}
                className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-500/50 ease-in-out border border-transparent rounded-3xl focus:outline-none hover:from-blue-500 hover:to-pink-500 focus:from-blue-500 focus:to-pink-500 transition-colors duration-700"
              >
                Sign in
              </button>
              <div className="flex items-center text-gray-900 justify-center opacity-70 hover:opacity-100">
                <button onClick={() => onAuthAction("signup")}>Register</button>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
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
              <button
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleAddresses}
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                <span>Addresses</span>
              </button>
              <button
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInDrawer;