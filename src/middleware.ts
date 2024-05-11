import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authorization from "./middlewares/authorization";

export function mainMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res
}

export default authorization(mainMiddleware, ['/'])