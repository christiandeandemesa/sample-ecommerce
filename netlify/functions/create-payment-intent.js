// ! Run project in terminal using netlify dev to use this function.

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Serverless function for netlify that creates a paymentIntent object with the amount paid, the currency used, and what forms of payment are accepted.
exports.handler = async e => {
	try {
		const {amount} = JSON.parse(e.body);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			payment_method_types: ['card']
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				paymentIntent: paymentIntent
			})
		};
	} catch (err) {
		console.log(err);

		return {
			statusCode: 400,
			body: JSON.stringify({
				err: err
			})
		};
	}
};
