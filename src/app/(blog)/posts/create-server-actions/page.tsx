"use client";

import { createPost } from "@/actions/create-post";

export default function CreatePost() {

  async function submit(formData: FormData) {
    await createPost(formData); // call the function to create post
  }
  
  // creer un formulaire
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Create a new post</h1>
      <form action={submit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Title" className="border border-gray-300 p-2 rounded" required />
        <textarea name="content" placeholder="Content" className="border border-gray-300 p-2 rounded" required></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Post</button>
      </form>
    </div>
  );
}