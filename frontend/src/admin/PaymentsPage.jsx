import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/AuthContext";

export default function PaymentsPage() {
  const { token } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/payments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="p-4">Loading payments...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="text-sm text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {payment.user?.name || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {payment.user?.email || "N/A"}
                </td>
                <td className="border px-4 py-2">{payment.type}</td>
                <td className="border px-4 py-2">${payment.amount/100}</td>
                <td className="border px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
