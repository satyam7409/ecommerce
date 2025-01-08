import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const Wishlist = () => {
  const {wishlist , removeFromWishlist, setHeartColor}=useContext(CartContext);


  return (
    <div>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ):(
        <div>
          {wishlist.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => removeFromWishlist(product.id)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

