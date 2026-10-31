import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function Home() {
  return (
    <main className="hero">
      <div>
        <p className="eyebrow">A little more green, every day</p>
        <h1>Welcome to Paradise Nursery</h1>
        <h2>Bring Nature Home</h2>
        <p>Discover beautiful houseplants for your space.</p>
        <Link className="button button-light" to="/plants">
          Get Started
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <footer className="footer">
        © {new Date().getFullYear()} Paradise Nursery. Bring Nature Home.
      </footer>
    </>
  );
}