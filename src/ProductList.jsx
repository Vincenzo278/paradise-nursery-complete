import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { addToCart } from './CartSlice.jsx';

const plants = [
  [1, 'Snake Plant', 25, 'Air Purifying'],
  [2, 'Peace Lily', 30, 'Air Purifying'],
  [3, 'Spider Plant', 18, 'Air Purifying'],
  [4, 'Areca Palm', 35, 'Air Purifying'],
  [5, 'Aloe Vera', 20, 'Air Purifying'],
  [6, 'Boston Fern', 28, 'Air Purifying'],

  [7, 'Monstera', 40, 'Decorative'],
  [8, 'Fiddle Leaf Fig', 45, 'Decorative'],
  [9, 'Rubber Plant', 32, 'Decorative'],
  [10, 'Calathea', 29, 'Decorative'],
  [11, 'Croton', 24, 'Decorative'],
  [12, 'Dracaena', 27, 'Decorative'],

  [13, 'Jade Plant', 15, 'Succulents'],
  [14, 'Echeveria', 12, 'Succulents'],
  [15, 'Haworthia', 14, 'Succulents'],
  [16, 'String of Pearls', 22, 'Succulents'],
  [17, "Burro's Tail", 19, 'Succulents'],
  [18, 'Zebra Plant', 17, 'Succulents']
].map(([id, name, price, category]) => ({
  id,
  name,
  price,
  category,
  image: `/plants/plant-${id}.svg`
}));

function Navbar() {
  const cart = useSelector(state => state.cart.items || []);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link className="brand" to="/">Paradise Nursery</Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart">
          🛒 Cart ({count})
        </NavLink>
      </nav>
    </header>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items || []);

  const categories = [
    'Air Purifying',
    'Decorative',
    'Succulents'
  ];

  return (
    <>
      <Navbar />

      <main className="page">
        <div className="heading">
          <p className="eyebrow">Find your new favorite</p>
          <h1>Our Houseplants</h1>
          <p>Choose a plant and add nature to your home.</p>
        </div>

        {categories.map(category => (
          <section className="plant-section" key={category}>
            <h2>{category}</h2>

            <div className="plant-grid">
              {plants
                .filter(plant => plant.category === category)
                .map(plant => {
                  const added = cart.some(
                    item => item.id === plant.id
                  );

                  return (
                    <article className="plant-card" key={plant.id}>
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="plant-image"
                      />

                      <div className="plant-info">
                        <h3>{plant.name}</h3>

                        <p className="price">
                          ${plant.price.toFixed(2)}
                        </p>

                        <button
                          className="button"
                          disabled={added}
                          onClick={() => dispatch(addToCart(plant))}
                        >
                          {added ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}