import postSchema from "@/schema/post-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Creating post...", request); // log to the console
  const { title, content } = await request.json(); // get the data from the request

  // Validate form data with zod
  const result = postSchema.safeParse({ title, content });

  if(!result.success) {
    // Map zod errors to state
    const fieldErrors: { title?: string; content?: string } = {};
    result.error.errors.forEach((err) => {
      if (err.path[0] === "title") fieldErrors.title = err.message;
      if (err.path[0] === "content") fieldErrors.content = err.message;
    });
    return NextResponse.json(JSON.stringify(fieldErrors), { status: 500 });
  }

  // 201 Created
  return NextResponse.json({
    message: "Post created successfully",
  });
}