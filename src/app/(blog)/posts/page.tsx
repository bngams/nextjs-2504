import Post from "@/models/post";
import { PostsList } from "@/ui/posts";

async function getData(): Promise<Post[]> {
  console.log("Fetching data..."); // log to the console
  // fetch the data
  const req = await fetch("https://jsonplaceholder.typicode.com/posts");
  // parse the response (JSON.parse(req.body))
  return req.json();
}

export default async function Posts() {
  const posts = await getData(); // fetch the json data
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Posts</h1>
      <input type="text" name="search" />
      {/* Le serveur renvoi un composant client */}
      <PostsList posts={posts} />
    </div>
  );
}