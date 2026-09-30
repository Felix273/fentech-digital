import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminToken, setAdminCookie } from "@/lib/admin/auth";
import { getClientAddress, rateLimit, rateLimitHeaders, sameOrigin } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    }

    const key = `admin-login:${getClientAddress(request)}:${String(email || "").toLowerCase()}`;
    const limit = rateLimit(key, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Try again later." },
        { status: 429, headers: rateLimitHeaders(limit) },
      );
    }

    if (!email || !password || String(email).toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(String(password), adminPasswordHash);

    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = createAdminToken(adminEmail);
    await setAdminCookie(token);

    return NextResponse.json({ success: true, user: adminEmail });
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
