const functions = require("firebase-functions");

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  // Stripe init
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:4242/success",
    cancel_url: "http://localhost:4242/cancel",
    line_items: [
        {
          price: "price_1IxYqXC4RmeVMzj56t3kuvgk",
          quantity: 1,
        },
    ],
  });

  return {
    id: session.id,
  };
});