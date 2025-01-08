import { React, createContext, useState, useEffect } from "react";
export const CartContext = createContext();
export const CardProvider=({children})=>{
   const [cart , setCart] = useState([]);
   const [wishlist, setWishlist]= useState([]);
   const [heartColor , setHeartColor]=useState(false);

   function addToCart(product){
    setCart((prevCart)=>[...prevCart, product])
   }

   function removeFromCart(id){
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
   }

   function addToWishlist(product){
    setWishlist((prevWishlist)=>[...prevWishlist , product])
   }

   function removeFromWishlist(id){
    setWishlist((prevWishlist)=>prevWishlist.filter(item=>item.id != id));
   }

  useEffect(() => {
    if(wishlist.length>0){
      setHeartColor(true);
    }
    else{
      setHeartColor(false);
    }
  }, [wishlist]);

   return (
    <CartContext.Provider value={{ cart,wishlist, addToCart, removeFromCart, addToWishlist , removeFromWishlist, heartColor }}>
      {children}
    </CartContext.Provider>
   );
}

