"use client";

import postSchema from "@/schema/post-schema";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate form data with zod
    const result = postSchema.safeParse({ title, content });

    if (!result.success) {
      // Map zod errors to state
      const fieldErrors: { title?: string; content?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "title") fieldErrors.title = err.message;
        if (err.path[0] === "content") fieldErrors.content = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Send a POST request to the API
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (response.ok) {
      console.log("Post created successfully");
      setTitle(""); // Reset form
      setContent("");
    } else {
      console.error("Error creating post");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Create a new post</h1>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border border-gray-300 p-2 rounded w-full"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div>
          <textarea
            name="content"
            placeholder="Content"
            className="border border-gray-300 p-2 rounded w-full"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
}