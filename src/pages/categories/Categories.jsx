import React, { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../services/api";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const categories  = await fetchProductsByCategory(categoryName);
      setProducts(categories );
      setLoading(false);
    };

    loadCategories ();
  }, [categoryName]);

  return (
    <div className="mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
