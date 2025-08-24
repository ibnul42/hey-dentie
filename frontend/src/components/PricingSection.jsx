import { useContext, useState } from "react";
import { AuthContext } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Dentie Basic",
    type: "Free Plan",
    price: "Free",
    features: [
      "Only 2 AI answer/day",
      "Limited history (3 days only)",
      "Daily Tips (basic)",
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
      "Unlimited AI answers",
      "Full habit tracker",
      "Natural remedy library",
      "Personalized insights",
      "Tips via WhatsApp/email",
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
    <section ref={premiumRef} className="py-5 md:py-7 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:py-5 lg:py-8 text-center">
        <h2 className="text-3xl xl:text-4xl font-bold mb-2 xl:py-3">
          Healthy Smile Plans - Start Free, Unlock Pro
        </h2>
        <p className="py-2 xl:py-4 xl:text-xl">No risk - cancel anytime, upgrade when ready.</p>

        {/* Billing toggle */}
        <div className="hidden md:flex justify-center gap-4 mb-10 xl:py-2">
          {["monthly", "yearly", "lifetime"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm xl:text-lg font-medium cursor-pointer ${
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
            <h3 className="text-xl xl:text-4xl font-semibold text-teal-600 mb-2 xl:mb-3">
              {plans[0].type}
            </h3>

            <p className="text-2xl xl:text-3xl font-bold mb-2 xl:mb-3">{plans[0].name}</p>
            <p className="text-3xl xl:text-4xl font-extrabold mb-4 text-gray-800">
              {plans[0].price}
              <span className="text-sm xl:text-lg font-normal text-gray-500 xl:mb-3"> /month</span>
            </p>

            <ul className="flex-1 space-y-2 mb-6 text-sm divide-y divide-gray-200 border rounded-lg overflow-hidden">
              {plans[0].features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center xl:text-xl justify-between px-4 py-2 xl:py-3 hover:bg-gray-50"
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
              className={`w-full py-3 rounded-xl font-semibold cursor-pointer transition-transform hover:scale-105 xl:my-3 ${
                !user
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {!user ? "Start Free - No Credit Card" : "Current Plan"}
            </button>
            <p className="pt-2 text-sm text-gray-500">
              "Dentie Pro helped me stop gum bleeding in just 2 weeks" - Alex,
              29
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-teal-400 relative">
            <div className="md:hidden flex justify-center gap-4 mb-10">
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
            <div className="relative w-fit">
              <div className="absolute -top-3 -right-20 xl:-right-32 h-full w-auto">
                <img
                  src="/logo.png"
                  className="h-full min-w-auto"
                  alt="dentie"
                />
              </div>
              <p className="bg-amber-300 w-fit rounded-xl xl:text-xl px-4 py-0.5 xl:mb-3">
                🔥Limited Time Offer
              </p>
              <p className="text-2xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent xl:mb-3">
                Dentie Pro
              </p>

              <p className="text-3xl xl:text-4xl font-extrabold mb-4 text-teal-700 xl:mb-3">
                {plans[1].prices[billing]}
                <span className="text-sm xl:text-lg font-normal text-gray-500">
                  {" "}
                  /month
                </span>
              </p>
            </div>

            <div className="mb-6">
              <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
                {plans[1].features.map((feature, i) => (
                  <li
                  key={i}
                  className="flex items-center xl:text-xl justify-between px-4 py-2 xl:py-3 hover:bg-gray-50"
                >
                  <span className="text-gray-700">{feature}</span>
                  <span className="text-green-600 font-bold">✔</span>
                </li>
                ))}
              </ul>
            </div>

            {/* Upgrade Button */}
            <button
              onClick={upgradeHandler}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white rounded-xl font-semibold cursor-pointer shadow-md transition-transform hover:scale-105 xl:my-3"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
      {/* CTA Strip After Pricing */}
      {!user && (
        <div className="mt-5 space-y-3 bg-teal-600 text-white py-8 xl:py-11 rounded shadow-lg text-center">
          <h3 className="text-2xl xl:text-4xl font-bold mb-4 xl:mb-5">
            Join 2,000+ Smarter Smiles
          </h3>
          <p className="xl:text-xl xl:py-1">Start Your Free AI Dental Coaching Today!</p>
          <ul className="list-disc xl:text-xl list-inside flex flex-col md:flex-row items-start justify-center gap-4 px-4">
            <li>No credit card</li>
            <li>Cancel anytime</li>
            <li>Backed by research</li>
          </ul>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 cursor-pointer xl:my-2"
          >
            Start Free
          </button>
        </div>
      )}
    </section>
  );
}
