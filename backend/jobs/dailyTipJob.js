const SibApiV3Sdk = require("sib-api-v3-sdk");

// ✅ Brevo API setup
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ Simple list of daily tips
const dailyTips = [
  "Drink water after meals to clean your mouth naturally.",
  "Replace your toothbrush every 3 months.",
  "Brush your tongue to prevent bad breath.",
  "Avoid sugary snacks between meals.",
  "Use a straw when drinking acidic beverages.",
];

// ✅ Function to send a single email
const sendDailyTipEmail = async (email, name, tip) => {
  try {
    const sendSmtpEmail = {
      to: [{ email, name }],
      sender: {
        name: "Hey Dentie",
        email: "ibnulashir42@gmail.com", // ⚠️ Make sure this sender is verified in Brevo
      },
      subject: "🦷 Your Dental Tip from Hey Dentie",
      htmlContent: `
        <p>Hi ${name || "there"},</p>
        <p>🪥 Here's your dental tip for today:</p>
        <blockquote style="color:#0f766e;font-weight:bold;font-size:1.1rem">${tip}</blockquote>
        <p>Stay healthy!<br/>– Hey Dentie Team</p>
      `,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error.response?.body || error.message);
  }
};

module.exports = { sendDailyTipEmail };
