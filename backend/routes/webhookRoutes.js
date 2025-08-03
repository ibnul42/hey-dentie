// routes/webhookRoutes.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const Payment = require("../models/Payment");
const User = require("../models/User"); // if updating user plan

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const subscriptionId = session.subscription;
      const amountTotal = session.amount_total;
      const userId = session.metadata?.userId;
      const billingType = session.metadata?.type; // ⬅️ new

      try {
        await Payment.create({
          user: userId,
          subscriptionId,
          type: billingType, // ⬅️ new
          amount: amountTotal,
          date: new Date(),
        });

        // Optional: update user
        if (userId) {
          await User.findByIdAndUpdate(userId, {
            isPremium: true,
            subscriptionType: billingType,
          });
        }

        console.log("✅ Payment stored with type:", billingType);
      } catch (err) {
        console.error("❌ Error saving payment:", err.message);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
