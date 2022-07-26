import {loadStripe} from '@stripe/stripe-js';

// Passed into index.js to use Stripe.
export const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
