import { NextResponse } from 'next/server';
import productsData from '../../utils/productsData';

export async function GET() {
  return NextResponse.json(productsData);
}
