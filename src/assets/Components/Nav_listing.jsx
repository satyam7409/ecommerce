import React from 'react';
import { useState } from 'react';
import Category from './Category';
import { products } from '../../data';
import Product_card from './Product_card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// For nav
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Listing = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <nav className="bg-green-400 h-28 flex justify-center items-center">
        <div className="flex w-[1170px] justify-between">
          <div>Rural Connect</div>
          <div className="flex ">
            <li><a href="">Home</a></li>
            <li><a href="">About us</a></li>
            <li><a href="">Contact us</a></li>
            <div className="flex">
              <input type="text" className="bg-gray-200" />
              <CiSearch />
            </div>
          </div>
          <div className="flex">
            <div>
              <FaRegHeart />
            </div>
            <div>
              <FaCartShopping />
            </div>
          </div>
        </div>
      </nav>
      <Category  />
      {/* Rendering mixed products */}
      <Slider {...settings}>
        {
          products.mixedProducts.map((item) => (
            <Product_card price={item.price} img={item.img} key={item.id} />
          ))
        }
      </Slider>

      <h1>enddd</h1>
    </>
  );
};

export default Listing;
