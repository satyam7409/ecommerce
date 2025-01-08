import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Category from './Category';
import Product_card from './Product_card';
import Navbar from './Navbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// For nav

import Aboutus from './Aboutus';
import Footer from './Footer';

const Listing = () => {
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
        console.log(response);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);


  // Sorting functionality
  function sortData(data) {
    setSort(data);
    console.log(data);
  }

  // Sorting the products based on the selected sort option
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    return 0; // Default: no sorting
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
    <Navbar />     
      {/* Category Sorting Component */}
      <Category giveSortData={sortData} />

      {/* Product Carousel/Slider */}
      <div style={{ marginLeft: '50px' }}>
      <Slider className='ml-3' {...settings}>
        {
          loading ? (
            <div>Loading...</div>  // Show loading message while data is being fetched
          ) : (
            sortedProducts.map((item) => (
              <Product_card 
              product={item}
                key={item.id}
                id={item.id} 
                price={item.price} 
                img={item.img} 
                name={item.name} 
              />
            ))
          )
        }
      </Slider>
      
</div>

      <Aboutus />
      <Footer />
    </>
  );
};

export default Listing;
