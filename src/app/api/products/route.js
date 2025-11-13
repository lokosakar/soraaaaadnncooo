import { NextResponse } from 'next/server';
import { products } from '../../utils/productsData';


export async function GET() {
return NextResponse.json(products);
}