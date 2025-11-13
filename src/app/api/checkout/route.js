import { NextResponse } from 'next/server';

/**
 * Simulasi proses checkout — aman, clean, predictable
 */
export async function POST(req) {
  try {
    // Ambil data dari FE
    const body = await req.json();

    // Validasi simple
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, message: "Data checkout tidak valid." },
        { status: 400 }
      );
    }

    console.log("Checkout request received:", body);

    // Delay biar FE bisa animasi loading
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Generate order id
    const orderId = Math.floor(Math.random() * 900000) + 100000;

    return NextResponse.json(
      {
        success: true,
        message: "Checkout berhasil! Pesanan sedang diproses ✨",
        orderId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Checkout API error:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.",
      },
      { status: 500 }
    );
  }
}
