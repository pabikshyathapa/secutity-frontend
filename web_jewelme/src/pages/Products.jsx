import { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiMoreVertical, FiStar } from "react-icons/fi";
import instance from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instance.get("/product")
      .then(res => {
        setProducts(res.data.data || []);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-80"
        />
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${p.productImage}`}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-gray-400 text-xs">PRD-{String(i + 1).padStart(3, "0")}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                    {p.categoryId?.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">${p.price}</td>
                <td className={`px-6 py-4 font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                  {p.stock ?? 0}
                </td>
                <td className="px-6 py-4 flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span>{p.rating ?? "4.5"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {p.stock === 0 ? 'out_of_stock' : 'active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center relative">
                  <div className="group relative inline-block">
                    <FiMoreVertical className="cursor-pointer text-gray-600" />
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10 hidden group-hover:block">
                      <button className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <FiEye className="mr-2" /> View
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <FiEdit2 className="mr-2" /> Edit
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
