import { useEffect, useState } from 'react';
import instance from '../api/api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/user').then(res => {
      setUsers(res.data.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Username</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.firstName} {u.lastName}</td>
              <td className="p-3">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
