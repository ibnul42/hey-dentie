import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import SendTipModal from "../components/SendTipModal";

const UsersPage = () => {
  const { token, user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showTipModal, setShowTipModal] = useState(false);
  const [tipUser, setTipUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChangeClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/user/${selectedUser._id}/role`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(`Role updated to ${data.role}`);
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to update role");
      }
    } catch {
      toast.error("Error updating role");
    }
  };

  const sendTip = async ({ user, subject, message }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send-tip`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user.email,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Daily tip sent!");
        return true; // ✅ indicate success
      } else {
        toast.error(data.error || "Failed to send tip");
        return false;
      }
    } catch (err) {
      toast.error("Error sending daily tip");
      return false;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">
        Users Management
      </h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Premium</th>
                <th className="px-4 py-2 border">Subscription</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    {user.isPremium ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="px-4 py-2 border">{user.subscriptionType}</td>
                  <td className="px-4 py-2 flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => handleRoleChangeClick(user)}
                      disabled={currentUser.id === user._id}
                      className={`text-sm cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed ${
                        user.role === "admin" ? "bg-red-500" : "bg-teal-600"
                      } hover:opacity-90 text-white px-3 py-1 rounded`}
                    >
                      Set as {user.role === "admin" ? "User" : "Admin"}
                    </button>

                    <button
                      onClick={() => {
                        setTipUser(user);
                        setShowTipModal(true);
                      }}
                      disabled={currentUser.id === user._id}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                      Send Tip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for confirming role change */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmRoleChange}
        title="Change User Role"
        description={`Are you sure you want to set "${
          selectedUser?.name || "this user"
        }" as ${selectedUser?.role === "admin" ? "User" : "Admin"}?`}
      />
      {/* Modal for sending daily tip */}
      <SendTipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
        user={tipUser}
        onSend={sendTip}
      />
    </div>
  );
};

export default UsersPage;
