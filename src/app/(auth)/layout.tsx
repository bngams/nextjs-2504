import React from 'react';

// notation: Component(props : type)
export default function AuthLayout({children} : { children: React.ReactNode}) {
  return (
    // ce bloc contient des éléments flexibles
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl p-4">Auth</h1>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}