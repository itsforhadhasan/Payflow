import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { importPublicKey } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("x-jwt")?.value;
  const { pathname } = req.nextUrl;

  // If no token and trying to access a protected route, redirect to login
  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  try {
    const publicKeyPem = process.env.JWT_PUBLIC_KEY;
    if (!publicKeyPem) {
      throw new Error("JWT_PUBLIC_KEY is not defined");
    }
    const cryptoKey = await importPublicKey(publicKeyPem);

    const decoded = await jwtVerify(token, cryptoKey, {
      algorithms: ["RS256"],
    });

    console.log("Decoded JWT:", decoded);

    const userType = decoded.payload.userType as string;

    // Define admin-only routes
    const adminOnlyRoutes = [
      "/dashboard/admins",
    ];

    // Define routes that admins cannot access (Consumer/Agent only)
    const userOnlyRoutes = [
      "/dashboard/account/update-profile",
    ];

    // Check if the current path is admin-only
    const isAdminOnlyRoute = adminOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    // Check if the current path is user-only (Consumer/Agent)
    const isUserOnlyRoute = userOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    // If trying to access admin-only route without admin privileges, redirect to dashboard
    if (isAdminOnlyRoute && userType !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If admin trying to access user-only route, redirect to dashboard
    if (isUserOnlyRoute && userType === "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If verification passes and user is trying to access a guest route, send them to dashboard
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Pass userType to the request via header
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-type", userType);
    requestHeaders.set("x-user-id", decoded.payload.id as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);

    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("x-jwt");

    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
