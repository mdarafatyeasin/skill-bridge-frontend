import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./constants/role";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const { user } = await userService.getSession();
    console.log("Session data:", user);

    if (!user) {
        // ❌ No session → redirect to login
        return NextResponse.redirect(new URL("/logIn", request.url));
    }

    const userRole = user.role

    // ✅ Role-based route protection
    if (pathName.startsWith("/adminDashboard") && userRole !== Role.admin) {
        return NextResponse.redirect(new URL("/teacherDashboard", request.url));
    }

    if (pathName.startsWith("/teacherDashboard") && userRole !== Role.teacher) {
        return NextResponse.redirect(new URL("/adminDashboard", request.url));
    }

    if (pathName.startsWith("/studentDashboard") && userRole !== Role.user) {
        return NextResponse.redirect(new URL("/logIn", request.url));
    }

    // ✅ Allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/adminDashboard/:path*",
        "/teacherDashboard/",
        "/studentDashboard/:path*",
    ],
};
