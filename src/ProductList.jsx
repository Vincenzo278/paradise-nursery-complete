import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addToCart} from './CartSlice.jsx';
const plants=[
[1,'Snake Plant',25,'Air Purifying'],[2,'Peace Lily',30,'Air Purifying'],[3,'Spider Plant',18,'Air Purifying'],[4,'Areca Palm',35,'Air Purifying'],[5,'Aloe Vera',20,'Air Purifying'],[6,'Boston Fern',28,'Air Purifying'],
[7,'Monstera',40,'Decorative'],[8,'Fiddle Leaf Fig',45,'Decorative'],[9,'Rubber Plant',32,'Decorative'],[10,'Calathea',29,'Decorative'],[11,'Croton',24,'Decorative'],[12,'Dracaena',27,'Decorative'],
[13,'Jade Plant',15,'Succulents'],[14,'Echeveria',12,'Succulents'],[15,'Haworthia',14,'Succulents'],[16,'String of Pearls',22,'Succulents'],[17,"Burro's Tail",19,'Succulents'],[18,'Zebra Plant',17,'Succulents']
].map(([id,name,price,category])=>({id,name,price,category,image:`/plants/plant-${id}.svg`}));
export default function ProductList(){const dispatch=useDispatch();const cart=useSelector(s=>s.cart.items);const categories=['Air Purifying','Decorative','Succulents'];return <main className="page"><div className="heading"><p className="eyebrow">Find your new favorite</p><h1>Our Houseplants</h1><p>Choose a plant and add nature to your home.</p></div>{categories.map(category=><section className="plant-section" key={category}><h2>{category}</h2><div className="plant-grid">{plants.filter(p=>p.category===category).map(p=>{const added=cart.some(x=>x.id===p.id);return <article className="plant-card" key={p.id}><img src={p.image} alt={p.name}/><div className="plant-info"><h3>{p.name}</h3><p className="price">${p.price.toFixed(2)}</p><button className="button" disabled={added} onClick={()=>dispatch(addToCart(p))}>{added?'Added to Cart':'Add to Cart'}</button></div></article>})}</div></section>)}</main>;}
