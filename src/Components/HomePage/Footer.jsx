import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productServices from "../../Services/product.services";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await productServices.getAllCategories();
        if (categoriesResponse && categoriesResponse.categories) {
          setCategories(categoriesResponse.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-6 gap-12">
          <div className="col-span-6 lg:col-span-2">
            <div className="space-y-8">
              <div className="space-y-4 border-b-2 border-gray-400 border-opacity-35 pb-3">
                <div className="w-full">
                  <Link to="/">
                    <img
                      src="/icons/logo1.png"
                      alt="Apple Asia Logo"
                      className="w-full"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-800">
                  Apple Asia is the largest Apple Products Seller in Sri Lanka
                  and we strive to bring the Apple products you love closer to
                  you.
                </p>
                <div className="flex items-center gap-2 mt-2 pt-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-800 w-4 h-4"
                  />
                  <a
                    href="mailto:info@appleasia.lk"
                    className="text-gray-800 hover:text-black text-sm"
                  >
                    info@appleasia.lk
                  </a>
                </div>
              </div>

              <div className="space-y-4 border-b-2 border-gray-400 border-opacity-35 pb-3">
                <h3 className="font-medium text-gray-900">
                  Brand New Apple Devices
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    Francium - Bambalapitiya Branch
                  </p>
                  <div className="flex items-start gap-2">
                    <a
                      href="https://goo.gl/maps/qqXvNMfKS11Pko177"
                      className="text-sm text-gray-800 hover:text-black"
                    >
                      No. 515, Lion House, Galle Road, Bambalapitiya, Colombo 04
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2 pt-3">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-gray-800 w-4 h-4"
                      />
                      <a
                        href="tel:+94770212294"
                        className="text-gray-800 hover:text-black text-sm"
                      >
                        +94770212294
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-gray-800 w-4 h-4 mt-1"
                      />
                      <a
                        href="https://goo.gl/maps/qqXvNMfKS11Pko177"
                        className="text-gray-800 hover:text-black text-sm"
                      >
                        Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Used Apple Devices
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    Apple Asia - Wellawatta Branch
                  </p>
                  <div className="flex items-start gap-2">
                    <a
                      href="https://goo.gl/maps/nrpC7KZtJUVJub5C9"
                      className="text-sm text-gray-800 hover:text-black"
                    >
                      No.11B, Fussel&apos;s lane, Wellawatta.
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2 border-b-2 border-gray-400 border-opacity-35 pb-3 mt-2 pt-3">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-gray-800 w-4 h-4"
                      />
                      <a
                        href="tel:+94770212294"
                        className="text-gray-800 hover:text-black text-sm"
                      >
                        +94770212294
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-gray-800 w-4 h-4 mt-1"
                      />
                      <a
                        href="https://goo.gl/maps/nrpC7KZtJUVJub5C9"
                        className="text-gray-800 hover:text-black text-sm"
                      >
                        Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-5 pt-2">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:border-gray-600 hover:bg-gray-800 group"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-gray-700 w-4 h-4 group-hover:text-white"
                      />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:border-gray-600 hover:bg-gray-800 group"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-gray-700 w-4 h-4 group-hover:text-white"
                      />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:border-gray-600 hover:bg-gray-800 group"
                    >
                      <FontAwesomeIcon
                        icon={faComments}
                        className="text-gray-700 w-4 h-4 group-hover:text-white"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-1">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-black">
                  Main Categories
                </h3>
                <div className="flex flex-col space-y-4">
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category._id} className="w-full">
                        <Link
                          to={`/categories/${encodeURIComponent(
                            category.name
                          )}`}
                          className="text-black hover:text-gray-600 inline-block font-medium"
                        >
                          <div className="relative pr-6">
                            <span className="inline-block transform transition-transform duration-300 hover:translate-x-2">
                              {category.name}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-black">Loading categories...</div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-black">
                  Quick Links
                </h3>
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <Link
                      to="/"
                      className="text-black hover:text-gray-600 inline-block font-medium"
                    >
                      <div className="relative pr-6">
                        <span className="inline-block transform transition-transform duration-300 hover:translate-x-2">
                          Home
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src="/customer/1.jpg"
                      alt="Contact Image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src="/customer/2.jpg"
                      alt="Contact Image 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src="/customer/3.jpg"
                      alt="Contact Image 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src="/customer/4.jpg"
                      alt="Contact Image 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t-2 border-gray-400 border-opacity-50 flex justify-between items-center">
          <div className="text-sm mt-3 text-gray-800">
            HANDSFREE.LK © 2024 CREATED BY TEAM HEX LAB
          </div>
          <div className="flex items-center"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
