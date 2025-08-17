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
      "Priority support",
    ],
  },
];

export default function PricingSection({ premiumRef }) {
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
          monthly: "price_1RsVbkLFC3zYqqmMmPnx8egR",
          yearly: "price_1RsVevLFC3zYqqmMWzPvTwxG",
          lifetime: "price_1RsVg0LFC3zYqqmMnsvTqiH5",
          // monthly: "price_1RrmWeIrKwv2F1FvBBNypBzH",
          // yearly: "price_1RrmX1IrKwv2F1FvpytMUU6I",
          // lifetime: "price_1RrmXyIrKwv2F1FvQMqNg6Rt",
        };
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
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
    <section ref={premiumRef} className="py-5 bg-gray-50">
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

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-6 flex flex-col rounded-2xl shadow-md border border-teal-100 relative">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              {plans[0].type}
            </h3>

            <p className="text-2xl font-bold mb-2">{plans[0].name}</p>
            <p className="text-3xl font-extrabold mb-4 text-gray-800">
              {plans[0].price}
              <span className="text-sm font-normal text-gray-500"> /month</span>
            </p>

            <ul className="flex-1 space-y-2 mb-6 text-sm divide-y divide-gray-200 border rounded-lg overflow-hidden">
              {plans[0].features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                >
                  <span className="text-gray-700">{feature}</span>
                  <span className="text-green-600 font-bold">✔</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  navigate("/login");
                }
              }}
              className={`w-full py-3 rounded-xl font-semibold cursor-pointer transition-transform hover:scale-105 ${
                !user
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {!user ? "Get Started Free" : "Current Plan"}
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-teal-400 relative">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⭐ Most Popular
              </span>
            </div>

            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Premium Plan
            </h3>
            <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
              Dentie Pro
            </p>

            <p className="text-3xl font-extrabold mb-4 text-teal-700">
              {plans[1].prices[billing]}
              <span className="text-sm font-normal text-gray-500"> /month</span>
            </p>

            <div className="mb-6">
              <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
                {plans[1].features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between px-4 py-2 hover:bg-teal-50"
                  >
                    <span className="text-gray-700 text-sm">{feature}</span>
                    <span className="text-green-600 font-bold">✔</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upgrade Button */}
            <button
              onClick={upgradeHandler}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white rounded-xl font-semibold cursor-pointer shadow-md transition-transform hover:scale-105"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
      {/* CTA Strip After Pricing */}
      {!user && (
        <div className="mt-5 bg-teal-600 text-white py-8 rounded shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join 2,000+ people getting smarter about dental health every day
          </h3>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
          >
            Start Free – No Card Required
          </button>
        </div>
      )}
    </section>
  );
}
