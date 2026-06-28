import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminToken, setAdminCookie } from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || (!adminPasswordHash && !adminPassword)) {
      return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    }

    if (!email || !password || String(email).toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const passwordMatches = adminPasswordHash
      ? await bcrypt.compare(password, adminPasswordHash)
      : password === adminPassword;

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
