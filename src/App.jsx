// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Listing from './assets/Components/Listing';
import Agriculture from './assets/Components/Agriculture'
import Artandcraft from './assets/Components/Artandcraft'
import Homedecor from './assets/Components/Homedecor'
import Fashion from './assets/Components/Fashion'
import ProductDetail from './assets/Components/Productdetail';
import Cart from './assets/Components/Cart';
import Wishlist from './assets/Components/Wishlist';
import Signup from './assets/Components/Signup';
import Verify_otp from './assets/Components/Verify_otp';
import { CardProvider, CartContext } from './assets/Context/CartContext';
import Password from './assets/Components/Password';
import Signin from './assets/Components/Signin';

function App() {
  return (
    <CardProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/agriculture" element={<Agriculture/>}/>
        <Route path="/artandcraft" element={<Artandcraft/>}/>
        <Route path="/home-decor" element={<Homedecor/>}/>
        <Route path="/fashion" element={<Fashion/>}/>
        <Route path="/product/:category/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<Verify_otp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/password" element={<Password />} />
        

      </Routes>
    </Router>
  </CardProvider>
  );
}

export default App;
