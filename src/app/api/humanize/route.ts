import { NextResponse } from "next/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { humanizeText } from "@/lib/ai/provider";

// Schema for input validation
const humanizeSchema = z.object({
  text: z.string().min(1, "Text is required").max(10000, "Maximum 10000 characters allowed"),
  tone: z.string().default("Natural"),
  intensity: z.string().default("Balanced"),
  grammarFix: z.boolean().default(false),
  improveReadability: z.boolean().default(false),
  preserveFormatting: z.boolean().default(true),
  preserveKeywords: z.boolean().default(false),
  expandOutput: z.boolean().default(false),
  shortenOutput: z.boolean().default(false),
});

// Initialize Upstash Redis and Ratelimit only if env vars are present
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = Redis.fromEnv();
  // 10 requests per hour limit as per spec
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    analytics: true,
  });
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    if (ratelimit) {
      // Get IP address
      const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "anonymous";
      
      const { success } = await ratelimit.limit(ip);
      
      if (!success) {
        return NextResponse.json(
          { 
            success: false, 
            message: "Rate limit exceeded. Please try again later." 
          },
          { status: 429 }
        );
      }
    }

    // 2. Parse and Validate Input
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const parseResult = humanizeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid input", 
          errors: parseResult.error.issues.map(e => e.message) 
        },
        { status: 400 }
      );
    }

    // 3. Call Unified AI Provider
    const response = await humanizeText(parseResult.data);

    if (!response.success) {
      return NextResponse.json(
        { success: false, message: response.message || "An unexpected error occurred." },
        { status: 500 }
      );
    }

    // 4. Return successful response
    return NextResponse.json(response);

  } catch (error) {
    // Catch-all handler - NEVER reveal internal errors or stack traces to client
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
