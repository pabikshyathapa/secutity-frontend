import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useGetOneCategory, useUpdateOneCategory } from '../../hooks/admin/useAdminCategory'
import { useParams } from 'react-router-dom'
import { getBackendImageUrl } from '../../utils/backend-image'
export default function UpdateCategory() {
    const { id } = useParams()

    const validationSchema = Yup.object(
        {
            name: Yup.string().required("Name required"),
            image: Yup.mixed().nullable().test(
                "fileSize",
                "File too large",
                (value) => !value || (value && value.size <= 5 * 1024 * 1024)
            )
        }
    )
    const categoryOne = useGetOneCategory(id)
    // categoryOne.data, categoryOne.isPending
    const updateCategory = useUpdateOneCategory()

    const formik = useFormik(
        {
            enableReinitialize: true, // allow rerender
            initialValues: {
                name: categoryOne.category?.name || "",
                image: "" // files/image no need to set
            },
            validationSchema,
            onSubmit: (values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                if (values.image) formData.append("image", values.image)
                updateCategory.mutate(
                    { id, data: formData },
                    {
                        onSuccess: () => formik.resetForm()
                    }
                )
            }
        }
    )
   return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Update Category</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category Name</label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Category Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              if (file) formik.setFieldValue("image", file);
            }}
            className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
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
                : getBackendImageUrl(categoryOne.category?.filepath)
            }
            alt="Preview"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
);

}