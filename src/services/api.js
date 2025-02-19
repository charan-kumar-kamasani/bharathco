import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);

  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.filter(
      (product) => product.category?.name === categoryName
    );
  } catch (error) {
    console.error(`Error fetching ${categoryName} products:`, error);
    return [];
  }
};
