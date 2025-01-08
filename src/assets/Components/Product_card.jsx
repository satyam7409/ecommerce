import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
const Product_card = ({product, id, category, price, img}) => {

  const { cart , addToCart } = useContext(CartContext);

  const navigate = useNavigate();
  function handleProductClick(){
    console.log("Product got clicked");
    navigate(`/product/${category}/${id}`)
    }
    function handleCardClick(){
      console.log("Clicked on add to cart");
      addToCart(product);
  }
  return (
    <div onClick={handleProductClick} className='flex flex-col items-center h-[290px] w-[270px]'>
        <div className=' h-[200px] w-[200px] '>
     <img className='h-[100%] w-[100%]' src={img} alt="" />
     </div>
     <div className='h-[90px] w-[74%]'>

      <div className='ml-3'>
      <h2 className='mt-1'>Coconut hails</h2>
      
      <div className='flex
      gap-3'>
      <h3>Rs: {price}</h3>
      <p>* * * * *</p>
      </div>
      <div className='mt-1' >
      <button className="bg-red-500  text-white text-xs py-1 px-1 text-center rounded" onClick={handleCardClick}>Add to Cart</button>
      </div>

      </div>

     </div>

    </div>
    
  )
}

export default Product_card