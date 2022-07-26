import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {selectTotalCount, selectCartItems} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';

import {clearAllItemsFromCart} from '../../store/cart/cart.action';

import Button from '../button/button.component';

import {PaymentFormContainer, FormContainer} from './payment-form.styles';

// This is the credit card payment form component.
function PaymentForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();

	const total = useSelector(selectTotalCount);
	const currentUser = useSelector(selectCurrentUser);
	const cartItems = useSelector(selectCartItems);

	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	// This function takes the paymentIntent object (i.e. res) and its unique id (i.e. clientSecret), then sends it to Stripe (i.e. paymentResult).
	const paymentHandler = async e => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessingPayment(true);

		const res = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				amount: total * 100 // The amount does not include periods, so $100.00 should be represented by 10000.
			})
		}).then(res => res.json());

		const clientSecret = res.paymentIntent.client_secret;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest' // If a user is logged in, use their name.
				}
			}
		});

		setIsProcessingPayment(false);

		if (paymentResult.err) alert(paymentResult.err);
		else {
			if (paymentResult.paymentIntent.status === 'succeeded') alert('Payment successful');

			navigate('/');

			dispatch(clearAllItemsFromCart()); // Removes all the items in the cart.
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				{/* Card Element is the credit card inputs provided by Stripe. */}
				<CardElement />
				{/* The button is disabled while making the request toward Stripe. */}
				<Button isLoading={isProcessingPayment} buttonType='inverted'>
					Purchase
				</Button>
			</FormContainer>
		</PaymentFormContainer>
	);
}

export default PaymentForm;
