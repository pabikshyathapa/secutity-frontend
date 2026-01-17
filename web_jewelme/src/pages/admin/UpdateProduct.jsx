import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useParams } from "react-router-dom"

import { useGetOneProduct, useUpdateOneProduct } from "../../hooks/admin/useAdminProduct"
import { useAdminCategory } from "../../hooks/admin/useAdminCategory"
import { useAdminUser } from "../../hooks/admin/useAdminUserr"
import { getBackendImageUrl } from "../../utils/backend-image"

export default function UpdateProduct() {
  const { id } = useParams()

  const { product, isLoading: productLoading } = useGetOneProduct(id)
  const { categories } = useAdminCategory()
  const { users: sellers } = useAdminUser()
  const updateProduct = useUpdateOneProduct()

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    categoryId: Yup.string().required("Category is required"),
    sellerId: Yup.string().required("Seller is required"),
    description: Yup.string().nullable(),
    stock: Yup.number().required("Stock is required").min(0, "Stock cannot be negative").integer(),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large (max 5MB)", (value) => !value || value.size <= 5 * 1024 * 1024)
      .test("fileType", "Unsupported file format", (value) =>
        !value || ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type)
      ),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      price: product?.price || "",
      categoryId: product?.categoryId?._id || product?.categoryId || "",
      sellerId: product?.sellerId?._id || product?.sellerId || "",
      description: product?.description || "",
      stock: product?.stock || 0,
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("price", values.price)
      formData.append("categoryId", values.categoryId)
      formData.append("sellerId", values.sellerId)
      formData.append("description", values.description)
      formData.append("stock", values.stock)
      if (values.image) formData.append("image", values.image)

      updateProduct.mutate({ id, data: formData }, { onSuccess: () => formik.resetForm() })
    },
  })

  if (productLoading) return <div>Loading product data...</div>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Update Product</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="categoryId"
              onChange={formik.handleChange}
              value={formik.values.categoryId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
            )}
          </div>

          {/* Seller */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Seller</label>
            <select
              name="sellerId"
              onChange={formik.handleChange}
              value={formik.values.sellerId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Seller</option>
              {sellers.map((seller) => (
                <option key={seller._id} value={seller._id}>
                  {seller.name || seller.email || seller._id}
                </option>
              ))}
            </select>
            {formik.touched.sellerId && formik.errors.sellerId && (
              <p className="text-red-500 text-sm">{formik.errors.sellerId}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Enter product description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              onChange={formik.handleChange}
              value={formik.values.stock}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter stock quantity"
            />
            {formik.touched.stock && formik.errors.stock && (
              <p className="text-red-500 text-sm">{formik.errors.stock}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0]
                if (file) formik.setFieldValue("image", file)
              }}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>

          {/* Image Preview */}
          <div className="mt-4">
            <p className="text-gray-600 mb-2 font-medium">Image Preview:</p>
            <img
              className="w-32 h-32 object-cover rounded-xl border shadow"
              src={
                formik.values.image
                  ? URL.createObjectURL(formik.values.image)
                  : getBackendImageUrl(product?.filepath)
              }
              alt="Preview"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={updateProduct.isLoading}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md disabled:opacity-50"
            >
              {updateProduct.isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
