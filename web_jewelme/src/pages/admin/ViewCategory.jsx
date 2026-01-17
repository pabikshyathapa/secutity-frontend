import React from 'react'
import { useGetOneCategory } from '../../hooks/admin/useAdminCategory'
import { useParams } from "react-router-dom"
import { getBackendImageUrl } from '../../utils/backend-image'

export default function ViewCategory() {
    const { id } = useParams()
    const { category, error, isPending } = useGetOneCategory(id)
    if(error) <>{error}</>
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex justify-center items-center p-6">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">Category Details</h1>
      <p className="text-lg font-semibold text-gray-700 mb-6">{category.name}</p>
      <img
        src={getBackendImageUrl(category.filepath)}
        alt={category.name}
        className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-200"
      />
    </div>
  </div>
);
}