import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateCategory } from '../../hooks/admin/useAdminCategory'
export default function CreateCategory() {
    const { mutate, data, error, isPending } = useCreateCategory()
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
    const formik = useFormik(
        {
            initialValues: {
                name: "",
                image: ""
            },
            validationSchema,
            onSubmit: (values) => {
                const formData = new FormData() // multipart request
                formData.append("name", values.name)
                if (values.image) formData.append("image", values.image)
                mutate(formData, {
                    onSuccess: () => {
                        formik.resetForm() // reset fields
                    }
                })
            }
        }
    )
    return (
  <div className="min-h-screen bg-gradient-to-br from-red-100 to-white flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Category</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter category name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              if (file) formik.setFieldValue("image", file);
            }}
            className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.image}</p>
          )}
        </div>

        {/* Preview */}
        {formik.values.image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border shadow"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition duration-200"
        >
          Create Category
        </button>
      </form>
    </div>
  </div>
);
}