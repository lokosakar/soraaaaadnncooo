'use client';
import { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import ProductCard from './ProductCard';


export default function ProductList({ showAll = false }){
const [loading, setLoading] = useState(true);
const [products, setProducts] = useState([]);


useEffect(() => {
async function load(){
const res = await fetch('/api/products');
const data = await res.json();
setProducts(data);
setLoading(false);
}
load();
}, []);


if (loading) return <div style={{ textAlign:'center', padding:40 }}><Spin /></div>;


const list = showAll ? products : products.slice(0, 6);


return (
<Row gutter={[16,16]}>
{list.map(p => (
<Col key={p.id} xs={24} sm={12} md={8} lg={6}>
<ProductCard product={p} />
</Col>
))}
</Row>
);
}