import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateProduct } from '../../hooks/admin/useAdminProduct'
import { useAdminCategory } from '../../hooks/admin/useAdminCategory'
import { useAdminUser } from '../../hooks/admin/useAdminUserr'

export default function CreateProduct() {
  const { mutate, isPending } = useCreateProduct()
  const { categories } = useAdminCategory()
  const { users: sellers } = useAdminUser() // Adapt if named differently

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    categoryId: Yup.string().required("Category is required"),
    sellerId: Yup.string().required("Seller is required"),
    description: Yup.string().nullable(),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock cannot be negative")
      .integer("Stock must be an integer"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File too large (max 5MB)",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type))
      ),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      categoryId: "",
      sellerId: "",
      description: "",
      stock: 0,
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

      mutate(formData, {
        onSuccess: () => {
          formik.resetForm()
        },
      })
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-100 flex items-center justify-center px-4 py-12">
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
      Add New Product
    </h2>
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      
      {/* Product Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Product Name</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Price</label>
        <input
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.price}</p>
        )}
      </div>

      {/* Category Select */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
        <select
          name="categoryId"
          onChange={formik.handleChange}
          value={formik.values.categoryId}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.categoryId}</p>
        )}
      </div>

      {/* Seller Select */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Seller</label>
        <select
          name="sellerId"
          onChange={formik.handleChange}
          value={formik.values.sellerId}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select seller</option>
          {sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
              {seller.name || seller.email || seller._id}
            </option>
          ))}
        </select>
        {formik.touched.sellerId && formik.errors.sellerId && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.sellerId}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
        <textarea
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Describe your product in detail..."
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.description}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Stock</label>
        <input
          name="stock"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.stock}
          min={0}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="e.g., 25"
        />
        {formik.touched.stock && formik.errors.stock && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.stock}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Product Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0]
            if (file) formik.setFieldValue("image", file)
          }}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-700"
        />
        {formik.touched.image && formik.errors.image && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.image}</p>
        )}
      </div>

      {/* Preview */}
      {formik.values.image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(formik.values.image)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border shadow"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Create Product"}
      </button>
    </form>
  </div>
</div>

  )
}


// import React from 'react'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import { useCreateProduct } from '../../hooks/admin/useAdminProduct'
// import { useAdminCategory } from '../../hooks/admin/useAdminCategory'
// import { useAdminUser } from '../../hooks/admin/useAdminUserr'

// export default function CreateProduct() {
//   const { mutate, isPending } = useCreateProduct()
//   const { categories } = useAdminCategory()
//   const { users: sellers } = useAdminUser() // Adapt if named differently

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Product name is required"),
//     price: Yup.number()
//       .required("Price is required")
//       .positive("Price must be positive"),
//     categoryId: Yup.string().required("Category is required"),
//     sellerId: Yup.string().required("Seller is required"),
//     image: Yup.mixed()
//       .nullable()
//       .test(
//         "fileSize",
//         "File too large (max 5MB)",
//         (value) => !value || (value && value.size <= 5 * 1024 * 1024)
//       )
//       .test(
//         "fileType",
//         "Unsupported file format",
//         (value) =>
//           !value ||
//           (value &&
//             ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type))
//       ),
//   })

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       price: "",
//       categoryId: "",
//       sellerId: "",
//       image: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const formData = new FormData()
//       formData.append("name", values.name)
//       formData.append("price", values.price)
//       formData.append("categoryId", values.categoryId)
//       formData.append("sellerId", values.sellerId)
//       if (values.image) formData.append("image", values.image)

//       mutate(formData, {
//         onSuccess: () => {
//           formik.resetForm()
//         },
//       })
//     },
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Product</h2>
//         <form onSubmit={formik.handleSubmit} className="space-y-5">
//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter product name"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
//             )}
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Price
//             </label>
//             <input
//               name="price"
//               type="number"
//               onChange={formik.handleChange}
//               value={formik.values.price}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter price"
//             />
//             {formik.touched.price && formik.errors.price && (
//               <p className="text-sm text-red-500 mt-1">{formik.errors.price}</p>
//             )}
//           </div>

//           {/* Category Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               name="categoryId"
//               onChange={formik.handleChange}
//               value={formik.values.categoryId}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">Select category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {formik.touched.categoryId && formik.errors.categoryId && (
//               <p className="text-sm text-red-500 mt-1">{formik.errors.categoryId}</p>
//             )}
//           </div>

//           {/* Seller Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Seller
//             </label>
//             <select
//               name="sellerId"
//               onChange={formik.handleChange}
//               value={formik.values.sellerId}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">Select seller</option>
//               {sellers.map((seller) => (
//                 <option key={seller._id} value={seller._id}>
//                   {seller.name || seller.email || seller._id}
//                 </option>
//               ))}
//             </select>
//             {formik.touched.sellerId && formik.errors.sellerId && (
//               <p className="text-sm text-red-500 mt-1">{formik.errors.sellerId}</p>
//             )}
//           </div>

//           {/* Product Image */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Image
//             </label>
//             <input
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.currentTarget.files[0]
//                 if (file) formik.setFieldValue("image", file)
//               }}
//               className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-500 file:text-white hover:file:bg-indigo-600"
//             />
//             {formik.touched.image && formik.errors.image && (
//               <p className="text-sm text-red-500 mt-1">{formik.errors.image}</p>
//             )}
//           </div>
          

//           {/* Preview */}
//           {formik.values.image && (
//             <div className="mt-4">
//               <img
//                 src={URL.createObjectURL(formik.values.image)}
//                 alt="Preview"
//                 className="w-32 h-32 object-cover rounded-md border shadow"
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
//           >
//             {isPending ? "Saving..." : "Create Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// import ProductItem from '../../components/admin/productItem' //aarys

// const products = [
//   {
//     pname: 'Bracelet',
//     pdetail: 'A bracelet is a piece of jewelry worn around the wrist, typically for decorative or symbolic purposes.',
//     pprice: 1500,
//   },
// //   {
// //     title: 'Breathing Techniques',
// //     course: 'Vocal Classes for Beginners',
// //     duration: 20,
// //   },
// //   {
// //     title: 'Basic Chord Progressions',
// //     course: 'Advanced Guitar Techniques',
// //     duration: 25,
// //   },
// ];

// export default function ProductContent() {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Content Management</h1>
//           <p className="text-sm text-gray-500">Manage lessons, videos, and resources</p>
//         </div>
//         <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800">
//           + Add Content
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-2 mb-4">
//         <button className="px-4 py-1 rounded bg-black text-white text-sm">Lessons</button>
//         <button className="px-4 py-1 rounded bg-gray-100 text-sm text-gray-700">Videos</button>
//         <button className="px-4 py-1 rounded bg-gray-100 text-sm text-gray-700">Resources</button>
//       </div>

//       {/* Recent  */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border">
//         <h2 className="text-lg font-semibold mb-3">New Products</h2>
//         {products.map((product, index) => (
//           <ProductItem
//             key={index}
//             title={product.pname}
//             course={product.pdetail}
//             duration={product.pprice}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useContext } from "react"; //mycode
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useCreateProduct } from "../../hooks/admin/useAdminProduct";
// import { AuthContext } from "../../auth/AuthProvider"; // if you use context for logged-in user
// import axios from "../../api/api"; // for category fetching

// export default function CreateProduct() {
//   const { user } = useContext(AuthContext); // sellerId from logged-in user
//   const { mutate, isPending, error } = useCreateProduct();
//   const [categories, setCategories] = useState([]);

//   // Fetch categories
//   useEffect(() => {
//     axios
//       .get("/admin/category")
//       .then((res) => setCategories(res.data.data || []))
//       .catch(() => setCategories([]));
//   }, []);

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Product name is required"),
//     price: Yup.number()
//       .typeError("Price must be a number")
//       .required("Price is required")
//       .positive("Price must be greater than 0"),
//     categoryId: Yup.string().required("Category is required"),
//     image: Yup.mixed()
//       .nullable()
//       .required("Product image is required")
//       .test("fileSize", "Image too large", (value) =>
//         !value || (value && value.size <= 5 * 1024 * 1024)
//       ),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       price: "",
//       categoryId: "",
//       image: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("price", values.price);
//       formData.append("categoryId", values.categoryId);
//       formData.append("userId", user._id); // from context
//       if (values.image) {
//         formData.append("productImage", values.image); // multer key
//       }

//       mutate(formData, {
//         onSuccess: () => {
//           formik.resetForm();
//           alert("Product added successfully!");
//         },
//       });
//     },
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
//         <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
//           Add Product
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           {/* Product Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Product Name
//             </label>
//             <input
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.name}
//               </p>
//             )}
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Price (Rs)
//             </label>
//             <input
//               name="price"
//               type="number"
//               onChange={formik.handleChange}
//               value={formik.values.price}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//             {formik.touched.price && formik.errors.price && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.price}
//               </p>
//             )}
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Category
//             </label>
//             <select
//               name="categoryId"
//               onChange={formik.handleChange}
//               value={formik.values.categoryId}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             >
//               <option value="">-- Select Category --</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {formik.touched.categoryId && formik.errors.categoryId && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.categoryId}
//               </p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Product Image
//             </label>
//             <input
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.currentTarget.files[0];
//                 formik.setFieldValue("image", file);
//               }}
//               className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//             {formik.touched.image && formik.errors.image && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.image}
//               </p>
//             )}
//           </div>

//           {/* Image Preview */}
//           {formik.values.image && (
//             <div className="mt-4">
//               <p className="text-gray-600 mb-2 font-medium">Image Preview:</p>
//               <img
//                 className="w-32 h-32 object-cover rounded-xl border shadow"
//                 src={URL.createObjectURL(formik.values.image)}
//                 alt="Preview"
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="pt-4">
//             <button
//               type="submit"
//               disabled={isPending}
//               className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200 shadow-md"
//             >
//               {isPending ? "Submitting..." : "Create Product"}
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <p className="text-red-600 text-sm mt-2 text-center">
//               {error.message || "Failed to create product"}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
