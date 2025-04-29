export default async function Categories({ params }: { params: Promise<{ category: string }> }) {
  // params is an object that contains the dynamic route parameters
  // params: Promise<{ category: string }> 
  const { category } = await params; // destructuring params to get category
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Category: { category }</h1>
      <p>List of posts will be displayed here.</p>
    </div>
  );
}