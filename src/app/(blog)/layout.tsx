import { findAllCategories } from '@/query/categories';
import Link from 'next/link';
import React from 'react';

// notation: Component(props : type)
export default async function PostsLayout({children} : { children: React.ReactNode}) {
  // children is a special prop that contains the child elements of the component
  let categories = null
  try {
    categories = await findAllCategories()
  } catch(error) {
    console.log(error);
  }

  return (
    <div className="flex">
      {/* zone sidebar */}
      {/* notation tailwind: width hauteur background alignement-flex */}
      <div className="w-[300px] h-screen bg-gray-200 p-4 flex flex-col gap-4">
        <ul>
          <li>
            <Link href={`/posts`}>Tous les posts</Link>
          </li>
        </ul>
        <span>Categories</span>
        <ul>
          {!categories ?  'Pas de categories' : categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* zone principale */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}