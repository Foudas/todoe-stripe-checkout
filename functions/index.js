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
//    line_items: [
//      {
//        quantity: 1,
//        price_data: {
//          currency: "usd",
//          unit_amount: (100) * 100, // 10000 = 100 USD
//          product_data: {
//            name: "New camera",
//          },
//        },
//      },
//    ],
  });

  return {
    id: session.id,
  };
});