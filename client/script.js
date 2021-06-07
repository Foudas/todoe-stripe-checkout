// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGPPwjCfDvKPoiJYwhftRtFAcsDxliFrI",
  authDomain: "todoe-8f40f.firebaseapp.com",
  databaseURL: "https://todoe-8f40f.firebaseio.com",
  projectId: "todoe-8f40f",
  storageBucket: "todoe-8f40f.appspot.com",
  messagingSenderId: "566738057465",
  appId: "1:566738057465:web:e7b543d474b4c520fe8a28",
  measurementId: "G-5Z152EDJZQ"
};




// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const checkoutButton = document.getElementById('basic-plan-btn')
const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout')
const stripe = Stripe('pk_live_51IxYO0C4RmeVMzj54jQvfVxdT7AG3O3lx4h4H0fSSi6L4L2wKbp1tO3qM6aaS6lwdg1PfYuVSsJZA8hV3hiPJgNy00rNMJVi68')

  checkoutButton.addEventListener('click', () => {
    createStripeCheckout()
      .then(response => {
        const sessionId = response.data.ifunctions/package.jsond
        stripe.redirectToCheckout({ sessionId: sessionId })
      })
  })

// If a fetch error occurs, log it to the console and show it in the UI.
var handleFetchResult = function(result) {
  if (!result.ok) {
    return result.json().then(function(json) {
      if (json.error && json.error.message) {
        throw new Error(result.url + ' ' + result.status + ' ' + json.error.message);
      }
    }).catch(function(err) {
      showErrorMessage(err);
      throw err;
    });
  }
  return result.json();
};

// Create a Checkout Session with the selected plan ID
var createCheckoutSession = function(priceId) {
  return fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      priceId: priceId
    })
  }).then(handleFetchResult);
};

// Handle any errors returned from Checkout
var handleResult = function(result) {
  if (result.error) {
    showErrorMessage(result.error.message);
  }
};

var showErrorMessage = function(message) {
  var errorEl = document.getElementById("error-message")
  errorEl.textContent = message;
  errorEl.style.display = "block";
};

/* Get your Stripe publishable key to initialize Stripe.js */
fetch("/setup")
  .then(handleFetchResult)
  .then(function(json) {
    var publishableKey = json.publishableKey;
    var basicPriceId = json.basicPrice;
    var proPriceId = json.proPrice;

    var stripe = Stripe(publishableKey);
    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("basic-plan-btn")
      .addEventListener("click", function(evt) {
        createCheckoutSession(basicPriceId).then(function(data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });

    // Setup event handler to create a Checkout Session when button is clicked
    document
      .getElementById("pro-plan-btn")
      .addEventListener("click", function(evt) {
        createCheckoutSession(proPriceId).then(function(data) {
          // Call Stripe.js method to redirect to the new Checkout page
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });
  });
