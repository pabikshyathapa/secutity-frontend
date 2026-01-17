import React from "react"
import { useParams } from "react-router-dom"
import { useGetOneProduct } from "../../hooks/admin/useAdminProduct"
import { getBackendImageUrl } from "../../utils/backend-image"

export default function ViewProducts() {
  const { id } = useParams()
  const { product, isPending, error } = useGetOneProduct(id)

  if (isPending) return <div className="text-center p-10">Loading...</div>
  if (error) return <div className="text-center text-red-500 p-10">Failed to load product.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Product Image */}
        <img
          src={getBackendImageUrl(product.filepath)}
          alt={product.name}
          className="w-full h-[500px] object-cover"
        />

        {/* Product Details */}
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-4">
            {product.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-800 text-lg">
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Price:</span>{" "}
                <span className="text-red-600 font-bold">Rs. {product.price}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Category:</span>{" "}
                {product.categoryId?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Stock:</span>{" "}
                {product.stock !== undefined ? product.stock : "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Seller:</span>{" "}
                {product.sellerId?.name || product.sellerId?.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Product ID:</span>{" "}
                {product._id}
              </p>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
