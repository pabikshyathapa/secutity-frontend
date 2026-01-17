import React, { useState } from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUserr";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { Eye, Trash2 } from "lucide-react";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";

export default function UserTable() {
  const { users, error, isPending } = useAdminUser();
  const deleteUser = useDeleteUser();
  const [deleteId, setDeleteId] = useState(null);

  const { setPageNumber, canNextPage, canPreviousPage, pagination } =
    useAdminCategory();

  const handlePrev = () => {
    if (canPreviousPage) {
      setPageNumber((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (canNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteUser.mutate(deleteId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete user");
        setDeleteId(null);
      },
    });
  };

  if (isPending)
    return <p className="text-center mt-10 text-[#222740]">Loading users...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading users: {error.message}
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user?"
      />

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-red-400 to-red-500 text-[#222740] uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#222740] divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4 font-medium text-base">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <Link to={`/admin/user/${user._id}`}></Link>

                    <button
                      onClick={() => setDeleteId(user._id)}
                      className="group bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full transition-all duration-200 shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={!canPreviousPage}
          className={`px-5 py-2 rounded-full text-white text-sm shadow-md ${
            canPreviousPage
              ? "bg-[#222740] hover:bg-[#3b4686]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span className="text-[#222740] font-semibold text-sm">
          Page {pagination?.page || 1} of {pagination?.totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={!canNextPage}
          className={`px-5 py-2 rounded-full text-white text-sm shadow-md ${
            canNextPage
              ? "bg-[#222740] hover:bg-[#3b4686]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
