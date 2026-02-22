import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "❌ MONGODB_URI not found! Add it to your .env.local file:\n" +
    "MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>"
  );
}

// Cache connection across hot-reloads in dev
let cached = (global as any)._mongooseCache || { conn: null, promise: null };
(global as any)._mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ [MongoDB] Connecting...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => {
        console.log("🟢 [MongoDB] Connected:", m.connection.db?.databaseName);
        return m;
      })
      .catch((err) => {
        console.error("🔴 [MongoDB] Connection FAILED:", err.message);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* ─────────────────────────────────────────────
   USER SCHEMA — password stored as plain text
───────────────────────────────────────────── */
const userSchema = new mongoose.Schema({
  platform:  { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName:  { type: String, default: "" },
  email:     { type: String, default: "" },
  phone:     { type: String, default: "" },
  username:  { type: String, default: "" },
  password:  { type: String, required: true }, // ⚠️ plain text
  createdAt: { type: Date, default: Date.now },
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);