import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { loadProducts } from "../redux/productSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaSort, FaFilter } from "react-icons/fa";
import { fetchCategories } from "../services/api";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { searchQuery } = useOutletContext();

  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("all");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterOption(selectedCategory);

    if (selectedCategory !== "all") {
      navigate(`/category/${selectedCategory}`);
    } else {
      navigate("/");
    }
  };

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const filteredAndSortedProducts = filteredProducts.filter((product) => {
    if (filterOption === "all") return true;
    return product.category === filterOption;
  });

  const sortedProducts = filteredAndSortedProducts.sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "nameAsc":
        return a.title.localeCompare(b.title);
      case "nameDesc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#F00" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4 p-2 mt-20">
        <div className="relative">
          <label className="flex items-center gap-2 font-medium">
            <FaSort className="text-gray-600" /> Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded w-40 mt-1"
          >
            <option value="default">Select</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>

        <div className="relative">
          <label className="flex items-center gap-2 font-medium">
            <FaFilter className="text-gray-600" /> Filters
          </label>
          <select
            value={filterOption}
            onChange={handleCategoryChange}
            className="border p-2 rounded w-40 mt-1"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="gap-4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <span className="text-6xl">😓</span>
            <span role="img" aria-label="No products found" className="text-xl">
              No products found.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
