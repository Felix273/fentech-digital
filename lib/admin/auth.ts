import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "fentech_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type AdminToken = {
  role: "admin";
  email: string;
};

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32 || secret.includes("replace-with")) {
    throw new Error("ADMIN_JWT_SECRET must be a strong, random secret of at least 32 characters.");
  }
  return secret;
}

export function createAdminToken(email: string) {
  return jwt.sign({ role: "admin", email } satisfies AdminToken, getSecret(), {
    expiresIn: SESSION_MAX_AGE_SECONDS,
    algorithm: "HS256",
    issuer: "fentech-digital-admin",
    audience: "fentech-digital",
  });
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, getSecret(), {
      algorithms: ["HS256"],
      issuer: "fentech-digital-admin",
      audience: "fentech-digital",
    }) as AdminToken;
    if (decoded.role !== "admin") return null;

    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
