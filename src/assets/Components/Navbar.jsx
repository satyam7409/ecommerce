import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const Navbar = () => {
  const {heartColor}=useContext(CartContext);
  return (
   <nav className=" h-28 flex justify-center items-center">
           <div className=" flex w-[1170px] h-[46px] justify-between">
             <div className=' flex justify-center items-center'>
               <h1 className='text-red-600 text-2xl  font-serif font-medium'>Rural Connect</h1>
             </div>
           <div className="flex items-center gap-8">
          {/* Links */}
          <ul className="flex list-none gap-6 items-center text-black font-sans font-normal">
            <li>
              <a href="#" className="hover:text-red-700">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-700">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-700">Contact Us</a>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="flex items-center gap-2 border-b-2 border-black pb-1 w-64">
            <CiSearch className="text-lg font-sans text-black" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-black w-full placeholder-gray-500"
            />
          </div>
        </div>
             <div className="text-xl flex justify-center items-center gap-3">
               <div>
                 <Link to="/wishlist" className={heartColor? "text-red-500" : "text-black"}><FaRegHeart /></Link>

               </div>
               <div>
                 <Link to="/cart" ><FaCartShopping  /></Link>
               </div>
             </div>
             <div className='flex justify-center items-center'>
        <Link  to="/signup" ><button>Sign up</button></Link>
        </div>
           </div>
         </nav>
  )
}

export default Navbar