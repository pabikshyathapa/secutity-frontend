import { useEffect, useState } from 'react';
import instance from '../api/api';
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get('/category')
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-indigo-800">Jewelry Categories</h1>

    {/* Featured Category - Jhumka */}
    <div className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
              Featured
            </span>
            <h2 className="text-2xl font-bold mt-2 text-indigo-900">Jhumka Earrings</h2>
            <span className="text-sm text-indigo-500 font-mono">CAT-001</span>
          </div>
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💎</span>
          </div>
        </div>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Traditional Indian earrings with intricate designs that complement both ethnic and contemporary outfits.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { products: 145, status: 'active', created: '2023-01-15' },
              { products: 298, status: 'active', created: '2023-01-10' },
              { products: 187, status: 'active', created: '2023-02-05' },
              { products: 89, status: 'active', created: '2023-02-20' },
              { products: 156, status: 'active', created: '2023-03-01' },
              { products: 34, status: 'inactive', created: '2023-03-15' },
            ].map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-indigo-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-indigo-500 mr-2">💬</span>
                    <span className="font-medium">{item.products}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {item.created}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="text-rose-600 hover:text-rose-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Other Categories */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { 
          name: 'Necklaces', 
          id: 'CAT-002', 
          desc: 'Elegant necklaces for every occasion',
          icon: '🔗',
          color: 'bg-amber-100'
        },
        { 
          name: 'Rings', 
          id: 'CAT-003', 
          desc: 'Beautiful rings including engagement and wedding bands',
          icon: '💍',
          color: 'bg-rose-100'
        },
        { 
          name: 'Hoops', 
          id: 'CAT-004', 
          desc: 'Classic and modern hoop earrings',
          icon: '🔄',
          color: 'bg-blue-100'
        },
        { 
          name: 'Bracelets', 
          id: 'CAT-005', 
          desc: 'Stylish bracelets and bangles',
          icon: '📿',
          color: 'bg-emerald-100'
        },
        { 
          name: 'Anklets', 
          id: 'CAT-006', 
          desc: 'Delicate anklets for a subtle touch',
          icon: '🦶',
          color: 'bg-purple-100'
        },
      ].map((category) => (
        <div 
          key={category.id} 
          className={`${category.color} p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm mr-4">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
              <span className="inline-block mt-1 text-xs font-mono text-gray-600 bg-white bg-opacity-50 px-2 py-1 rounded">
                {category.id}
              </span>
              <p className="mt-2 text-gray-700">{category.desc}</p>
              <button className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                View products →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
