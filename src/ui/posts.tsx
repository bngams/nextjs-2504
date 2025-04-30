"use client";

import Post from "@/models/post";
import React from "react";

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="list-style-none list-inside">
      {posts.map((post) => (
        <li key={post.id} className="p-4 border-b-2 border-gray-200">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}