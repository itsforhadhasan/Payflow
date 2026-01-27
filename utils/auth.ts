
import { jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

export async function importPublicKey(pem: string): Promise<CryptoKey> {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem
    .substring(pemHeader.length, pem.length - pemFooter.length)
    .trim();
  const binaryDer = Buffer.from(pemContents, "base64");

  return await crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: { name: "SHA-256" },
    },
    true,
    ["verify"],
  );
}

export async function getUserTypeFromJWT(): Promise<string | null> {
  try {
    const token = (await cookies()).get("x-jwt")?.value;

    if (!token) {
      return null;
    }

    const publicKeyPem = process.env.JWT_PUBLIC_KEY;
    if (!publicKeyPem) {
      throw new Error("JWT_PUBLIC_KEY is not defined");
    }

    const cryptoKey = await importPublicKey(publicKeyPem);
    const decoded = await jwtVerify(token, cryptoKey, {
      algorithms: ["RS256"],
    });

    const userType = decoded.payload.userType as string;
    return userType || null;
  } catch (error) {
    console.error("Error extracting userType from JWT:", error);
    return null;
  }
}

// Get userType from middleware-injected header (more efficient for server components)
export async function getUserTypeFromHeader(): Promise<string | null> {
  try {
    const headersList = await headers();
    const userType = headersList.get("x-user-type");
    return userType;
  } catch (error) {
    console.error("Error extracting userType from header:", error);
    return null;
  }
}
