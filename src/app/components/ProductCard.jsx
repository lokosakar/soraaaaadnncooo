'use client';
import { Card, Button } from 'antd';
import { useCart } from '../context/CartContext';


export default function ProductCard({ product }){
const { addToCart } = useCart();
return (
<Card hoverable style={{ width: 240 }} cover={<img alt={product.name} src={product.image} /> }>
<Card.Meta title={product.name} description={`Rp ${product.price.toLocaleString()}`} />
<div style={{ marginTop:12 }}>
<Button type="primary" block onClick={() => addToCart(product)}>Add to Cart</Button>
</div>
</Card>
);
}