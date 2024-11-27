"use server";
import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const secretKey = process.env.JWT_AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

export async function POST(req) {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const body = await req.json();
    const {
      userId,
      amount,
      quantifyNumber,
      leftQuantifyNumber,
      dailyReturn,
    } = body;

    const { db } = await connectToDatabase();

    if (leftQuantifyNumber > 0) {
      const dailyIncrement = (dailyReturn / 100) * amount;
      const incrementPerRequest = parseFloat((dailyIncrement / quantifyNumber).toFixed(2)); 
      const updatedAmount = parseFloat((parseFloat(amount) + incrementPerRequest).toFixed(2)); 

      const userUpdateResult = await db.collection('users').updateOne(
        { user_id: userId },
        {
          $inc: {
            blocked_amount: parseFloat(incrementPerRequest.toFixed(2)), 
            balance: parseFloat(incrementPerRequest.toFixed(2)), 
            daily_earning: parseFloat(incrementPerRequest.toFixed(2)), 
            total_earning: parseFloat(incrementPerRequest.toFixed(2)), 
          },
        }
      );

      if (userUpdateResult.matchedCount === 0) {
        return NextResponse.json(
          { error: "Kullanıcı bulunamadı veya güncelleme başarısız" },
          { status: 404 }
        );
      }

      const updatedUser  = await db.collection('users').findOne({ user_id: userId });
      const expires = new Date(Date.now() + 60 * 60 * 3 * 1000); 
      const session = await encrypt({ user: updatedUser , expires });

      const termUpdateResult = await db.collection('term_investments').updateOne(
        { user_id: userId },
        { $inc: { left_quantify_number: -1 } }
      );

      if (termUpdateResult.matchedCount === 0) {
        return NextResponse.json(
          { error: "Term investment bulunamadı veya güncelleme başarısız" },
          { status: 404 }
        );
      }

      await delay(20000);

      const response = NextResponse.json({
        success: true,
        message: "Quantify başarılı",
        addedAmount: parseFloat(incrementPerRequest.toFixed(2)),
        updatedAmount: parseFloat(updatedAmount.toFixed(2)),
      });
      
      response.cookies.set("session", session, { expires, httpOnly: true });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Ölçüm kalmadı" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}