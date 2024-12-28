import React, { useState } from 'react';
import './App.css';
import cake1 from './assets/images/cake1.jpg';
import cake2 from './assets/images/cake2.jpg';
import cake3 from './assets/images/cake3.jpg';
import cake4 from './assets/images/cake4.jpg';
import cake5 from './assets/images/cake5.jpg';
import cake6 from './assets/images/cake6.jpg';
import cake7 from './assets/images/cake7.jpg';
import cake8 from './assets/images/cake8.jpg';
import cake9 from './assets/images/cake9.jpg';
import cake10 from './assets/images/cake10.jpg';
import { CiSearch } from 'react-icons/ci';
import { FaShoppingCart } from 'react-icons/fa';

const cakes = [
  { name: 'Normal cake', price: 100, img: cake1 },
  { name: 'Chocolate cake', price: 200, img: cake2 },
  { name: 'Fruit cake', price: 350, img: cake3 },
  { name: 'Strawberry cake', price: 300, img: cake4 },
  { name: 'Vanilla cake', price: 400, img: cake5 },
  { name: 'Red Velvet cake', price: 250, img: cake6 },
  { name: 'Cheese cake', price: 200, img: cake7 },
  { name: 'Cupcake', price: 100, img: cake8 },
  { name: 'Oreo cake', price: 150, img: cake9 },
  { name: 'Brownie', price: 400, img: cake10},
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const addToCart = (cake) => {
    setCartItems((prev) => {
      const quantity = prev[cake.name] ? prev[cake.name].quantity + 1 : 1;
      return {
        ...prev,
        [cake.name]: { ...cake, quantity },
      };
    });
  };

  const updateQuantity = (cakeName, amount) => {
    setCartItems((prev) => {
      const item = prev[cakeName];
      if (item) {
        const newQuantity = item.quantity + amount;
        if (newQuantity <= 0) {
          const { [cakeName]: removed, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [cakeName]: { ...item, quantity: newQuantity },
        };
      }
      return prev;
    });
  };

  const filteredCakes = cakes.filter((cake) =>
    cake.name.toLowerCase().includes(searchTerm)
  );

  const cartItemCount = Object.values(cartItems).reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="overall">
      <nav>
        <h1 id='heading'><span>Tasty</span> Desserts</h1>
        <div className='search'>
          <input
            type='text'
            className='inputbox'
            placeholder='Search for your need'
            onChange={handleSearch}
          />
          <button className='searchbtn'><CiSearch /></button>
        </div>
        <div className="cart-container">
          <button className='cart' onClick={toggleCart}><FaShoppingCart /></button>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </div>
      </nav>
      <div className='Productes'>
        {filteredCakes.map((cake, index) => (
          <div key={index} className={`box pro_${index}`} onClick={() => addToCart(cake)}>
             <img src={cake.img} alt={cake.name.img} className="inside" />
            {/* <img src={`./assets/images/${cake.img}`} alt={cake.name} className='inside' /> */}
            <h1>₹{cake.price}</h1>
            <h2 className='inside_color'>{cake.name}</h2>
          </div>
        ))}
      </div>
      {cartVisible && <CartDetails cartItems={cartItems} toggleCart={toggleCart} updateQuantity={updateQuantity} />}
    </div>
  );
}

function CartDetails({ cartItems, toggleCart, updateQuantity }) {
  const total = Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-details">
      <button className="close-btn" onClick={toggleCart}>Close</button>
      <h2>Cart Details</h2>
      <ul>
        {Object.entries(cartItems).map(([cakeName, item]) => (
          <li key={cakeName}>
            {item.name} - ₹{item.price} x {item.quantity}
            <button onClick={() => updateQuantity(cakeName, 1)}>+</button>
            <button onClick={() => updateQuantity(cakeName, -1)}>-</button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
