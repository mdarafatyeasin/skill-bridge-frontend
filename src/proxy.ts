import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role, RoleType } from "./constants/role";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const { user } = await userService.getSession();

    if (!user) {
        return NextResponse.redirect(new URL("/logIn", request.url));
    }

    const validRoles = Object.values(Role);
    const userRole = validRoles.includes(user.role)
        ? (user.role as RoleType)
        : Role.user;

    const rolePathMap: Record<RoleType, string> = {
        [Role.admin]: "/adminDashboard",
        [Role.teacher]: "/teacherDashboard",
        [Role.user]: "/studentDashboard",
    };

    const allowedPath = rolePathMap[userRole];

    if (!pathName.startsWith(allowedPath)) {
        return NextResponse.redirect(new URL(allowedPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/adminDashboard/:path*",
        "/teacherDashboard/:path*",
        "/studentDashboard/:path*",
    ],
};
