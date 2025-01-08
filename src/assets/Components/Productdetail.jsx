import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';

const ProductDetail = () => {
  const {addToCart, addToWishlist} = useContext(CartContext);
  const { category, id } = useParams(); // Get both category and product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details by category and ID
    axios
      .get(`http://localhost:5000/products/${category}/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [category, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  function handleCardClick(){
    console.log("Clicked on add to cart");
    addToCart(product);
  }
  function handleWishClick(){
    console.log("Clicked on wishlist card");
    addToWishlist(product);
    
  }
  return (
    <div className="p-6">
      <img src={product.img} alt={product.name} className="w-1/2 h-auto mx-auto" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleCardClick}>Add to Cart</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleWishClick}>Add to wishlist</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">Buy Now</button>
    </div>
  );
};

export default ProductDetail;
