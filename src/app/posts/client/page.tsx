"use client";

import React, { useEffect } from "react";

// Définir le type Post (type vs. interface)
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getData(): Promise<Post[]> {
  console.log("Fetching data..."); // log to the console
  // fetch the data
  const req = await fetch("https://jsonplaceholder.typicode.com/posts");
  // parse the response (JSON.parse(req.body))
  return req.json();
}

// côté client le composant doit être un composant fonctionnel (non async)
export default function Posts() {
  // useState to manage posts state
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(); // fetch the json data
      setPosts(data); // set the posts state
      setTimeout(() => {        
        setLoading(false); // set loading to false
      }, 2000);
    };
    fetchData();
  }, []); // empty dependency array to run only once

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <p>Loading...</p> // show loading message while fetching data
      ) : (
        <>
          <h1 className="text-3xl">Posts</h1>
          <ul className="list-style-none list-inside">
            {posts.map((post) => (
              <li key={post.id} className="p-4 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}