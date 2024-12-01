import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import productServices from "../../Services/product.services";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Categories from Backend
  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await productServices.getAllCategories();

      // Check if response and categories exist
      if (response && response.categories) {
        // Transform backend data to match the expected format
        // Removed toLowerCase() to preserve original case
        const transformedCategories = response.categories.map((category) => ({
          _id: category._id,
          image: category.image.url,
          title: category.name,
          href: `/categories/${category.name}`,
        }));

        setCategories(transformedCategories);
        setError(null);
      } else {
        throw new Error("No categories found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Loading and Error States
  if (isLoading) {
    return <div className="w-full text-center py-8">Loading categories...</div>;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="pb-4 sm:pb-6 lg:pb-8">
        <h2 data-testid="popular-categories-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
          Categories
        </h2>
      </div>

      {categories.length === 0 ? (
        <div data-testid="no-categories-found" className="w-full text-center py-8 text-gray-500">
          No categories found
        </div>
      ) : (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          className="w-full"
          breakpoints={{
            300: { slidesPerView: 2, spaceBetween: 12 },
            320: { slidesPerView: 2, spaceBetween: 12 },
            400: { slidesPerView: 2, spaceBetween: 50 },
            540: { slidesPerView: 2, spaceBetween: 16 },
            680: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 6, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
            1536: { slidesPerView: 6, spaceBetween: 24 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="w-full group">
                <a
                  href={category.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  aria-label={`View ${category.title} category`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                      <img
                        className="h-full w-full object-contain transition-all duration-300 group-hover:brightness-105"
                        src={category.image}
                        alt={category.title}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 text-center">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {category.title}
                    </h3>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PopularCategories;
