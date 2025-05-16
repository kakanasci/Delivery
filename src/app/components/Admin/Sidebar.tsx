'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h1 className="text-2xl font-bold text-center text-blue-400 mb-8">Admin</h1>
      <ul>
        <li>
          <Link href="/admin/categorias" className="block p-2 hover:bg-gray-600 rounded">
            Categorias
          </Link>
        </li>
        <li>
          <Link href="/admin/produtos" className="block p-2 hover:bg-gray-600 rounded">
            Produtos
          </Link>
        </li>
      </ul>
    </div>
  )
}
