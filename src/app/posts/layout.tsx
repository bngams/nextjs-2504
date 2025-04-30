import { findAllCategories } from '@/query/categories';
import React from 'react';

// notation: Component(props : type)
export default async function PostsLayout({children} : { children: React.ReactNode}) {

  const categories = await findAllCategories()
  return (
    // ce bloc contient des éléments flexibles
    <div className="flex">
      {/* zone sidebar */}
      {/* notation tailwind: width hauteur background alignement-flex */}
      <div className="w-[300px] h-screen bg-gray-200 p-4 flex flex-col gap-4">
        <span>Categories</span>
        <ul>
          {!categories ?  'Pas de categories' : categories.map((category) => (
            <li key={category.id}>
              <a href={`/posts/${category.name}`}>{category.name}</a>
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