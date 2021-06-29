// dependencies
import React, { useEffect, useState } from 'react';
import {
   getDatabaseCart,
   processOrder,
   removeFromDatabaseCart,
} from './../../utilities/databaseManager';
import fakeData from './../../fakeData/index';
import ReviewItem from './../ReviewItem/ReviewItem';
import Cart from './../Cart/Cart';
import happyImg from './../../images/giphy.gif';

const Review = () => {
   const [cart, setCart] = useState([]);
   const [orderPlaced, setOrderPlaced] = useState(false);

   const removeProduct = (productKey) => {
      const newCart = cart.filter((pd) => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   };

   const handleOrder = () => {
      setCart([]);
      setOrderPlaced(true);
      processOrder();
   };

   useEffect(() => {
      // cart
      const savedCart = getDatabaseCart();

      const productKeys = Object.keys(savedCart);

      const cartProducts = productKeys.map((key) => {
         const product = fakeData.find((pd) => pd.key === key);
         product.quantity = savedCart[key];
         return product;
      });
      setCart(cartProducts);
   }, []);

   let thankyou;
   if (orderPlaced) {
      thankyou = <img src={happyImg} alt="" />;
   }

   return (
      <div>
         <div className="shop-container">
            <div className="products-area">
               {cart.map((pd) => (
                  <ReviewItem
                     key={pd.key}
                     removeProduct={removeProduct}
                     product={pd}
                  ></ReviewItem>
               ))}
               {thankyou}
            </div>
            <div className="cart-area">
               <Cart cart={cart}>
                  <button onClick={handleOrder} className="btn">
                     Place Order
                  </button>
               </Cart>
            </div>
         </div>
      </div>
   );
};

export default Review;
