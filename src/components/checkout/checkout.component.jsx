import {React, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {selectCartItems, selectTotalCount} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';

import CheckoutItem from '../checkout-item/checkout-item.component';
import PaymentForm from '../payment-form/payment-form.component';

import './checkout.styles.scss';

// This is the checkout page component.
function Checkout() {
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);
	const totalCount = useSelector(selectTotalCount);

	useEffect(() => {
		dispatch(setIsCartOpen(false));
	}, []);

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>

				<div className='header-block'>
					<span>Description</span>
				</div>

				<div className='header-block'>
					<span>Quantity</span>
				</div>

				<div className='header-block'>
					<span>Price</span>
				</div>

				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>

			{cartItems.map(cartItem => {
				return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
			})}

			<span className='total'>Total: ${totalCount}</span>

			<PaymentForm />
		</div>
	);
}

export default Checkout;
