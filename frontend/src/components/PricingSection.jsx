import { useContext, useState } from "react";
import { AuthContext } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Dentie Basic",
    type: "Free Plan",
    price: "Free",
    features: [
      "Ask Dentie (2 questions/day)",
      "Daily Dental Tip",
      "Personal Tracker",
      "Past 3 days history",
      "No reminders, suggestions, or email tips",
    ],
  },
  {
    name: "Dentie Pro",
    type: "Premium Plan",
    prices: {
      monthly: "$4.99/mo",
      yearly: "$49.99/yr",
      lifetime: "$99 (launch offer)",
    },
    features: [
      "Unlimited AI chat",
      "Daily Tips",
      "Full tracker access",
      "Natural remedy library",
      "Personalized suggestions",
      "Email/WhatsApp tips",
      "Human dental review",
      "Priority support",
    ],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const upgradeHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    } else {
      try {
        const prices = {
          monthly: "price_1RrmWeIrKwv2F1FvBBNypBzH",
          yearly: "price_1RrmX1IrKwv2F1FvpytMUU6I",
          lifetime: "price_1RrmXyIrKwv2F1FvQMqNg6Rt",
        };
        const response = await fetch(
          "http://localhost:5500/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              priceId: prices[billing],
              userId: user.id,
              billingType: billing,
            }),
          }
        );
        const session = await response.json();
        window.location.href = session.url; // Redirect to Stripe Checkout
      } catch (error) {
        console.error("Error upgrading:", error);
      }
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Free vs. Premium Access</h2>

        {/* Billing toggle */}
        <div className="flex justify-center gap-4 mb-10">
          {["monthly", "yearly", "lifetime"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                billing === option
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setBilling(option)}
            >
              {option === "monthly"
                ? "Monthly"
                : option === "yearly"
                ? "Yearly"
                : "Lifetime"}
            </button>
          ))}
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Free Plan */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-teal-100">
            <h3 className="text-xl font-semibold text-teal-600">
              {plans[0].type}
            </h3>
            <p className="text-2xl font-bold mb-4">{plans[0].name}</p>
            <p className="text-3xl font-bold mb-4">{plans[0].price}</p>
            <ul className="space-y-2 mb-6 text-sm">
              {plans[0].features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-600 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-gray-300 text-gray-700 rounded-xl font-semibold cursor-default">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-300">
            <h3 className="text-xl font-semibold text-yellow-500">
              {plans[1].type}
            </h3>
            <p className="text-2xl font-bold mb-4">{plans[1].name}</p>
            <p className="text-3xl font-bold mb-4">
              {plans[1].prices[billing]}
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              {plans[1].features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-600 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => upgradeHandler(e)}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
