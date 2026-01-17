import React, { useState } from 'react'
import { useAdminProduct, useDeleteOneProduct } from '../../hooks/admin/useAdminProduct'
import { getBackendImageUrl } from '../../utils/backend-image'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'
import { FaEdit, FaEye, FaTrash, FaBoxOpen, FaPlus } from 'react-icons/fa'

export default function ProductTable() {
  const [deleteId, setDeleteId] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { products, error, isPending, pages } = useAdminProduct(page);
  const deleteProductHook = useDeleteOneProduct()

  const handleDelete = () => {
    deleteProductHook.mutate(deleteId, {
      onSuccess: () => setDeleteId(null)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this product?"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <FaBoxOpen className="text-red-600 text-3xl" />
          <h2 className="text-3xl font-extrabold text-gray-800">Product List</h2>
        </div>

        {/* Search + Add Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <Link to="/admins/productss/create">
            <button className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md">
              <FaPlus /> Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Product Cards */}
      {isPending ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((product) => (
    <div
      key={product._id}
      className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 w-[280px] sm:w-[360px] mx-auto"
    >
      <img
        src={getBackendImageUrl(product.filepath)}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">Price: Rs. {product.price}</p>
        <p className="text-sm text-gray-600">Category: {product.categoryId?.name || 'N/A'}</p>
        <p className="text-sm text-gray-600">Seller: {product.sellerId?.name || 'N/A'}</p>
        <p className="text-sm text-gray-600">Description: {product.description || 'No description'}</p>
        <p className="text-sm text-gray-600">Stock: {product.stock != null ? product.stock : 'N/A'}</p>
      </div>

      <div className="flex justify-around items-center p-3 border-t text-gray-600">
        <Link to={`/admins/productss/${product._id}`} title="View">
          <FaEye className="hover:text-blue-600 cursor-pointer" />
        </Link>
        <Link to={`/admins/productss/${product._id}/edit`} title="Edit">
          <FaEdit className="hover:text-yellow-500 cursor-pointer" />
        </Link>
        <FaTrash
          title="Delete"
          onClick={() => setDeleteId(product._id)}
          className="hover:text-red-600 cursor-pointer"
        />
      </div>
    </div>
  ))}

        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
        >
          Prev
        </button>

        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${page === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
          disabled={page === pages}
          className={`px-4 py-2 rounded-lg ${page === pages ? 'bg-gray-300' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}


