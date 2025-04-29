import { findCategory } from "@/query/categories";


export default async function Categories({ params }: { params: Promise<{ category: string }> }) {
  // params is an object that contains the dynamic route parameters
  // params: Promise<{ category: string }> 
  const { category } = await params; // destructuring params to get category

  const categoryData = await findCategory(category); // call the function to get category data

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Category: { categoryData ? categoryData[0]?.name : 'Pas de categorie'}</h1>
      <p>List of posts will be displayed here.</p>
    </div>
  );
}