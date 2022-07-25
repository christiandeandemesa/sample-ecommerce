import {React} from 'react';
import {useSelector} from 'react-redux';

import {selectCartItems, selectTotalCount} from '../../store/cart/cart.selector';

import CheckoutItem from '../checkout-item/checkout-item.component';

import './checkout.styles.scss';

// This is the checkout page component.
function Checkout() {
	const cartItems = useSelector(selectCartItems);
	const totalCount = useSelector(selectTotalCount);

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
		</div>
	);
}

export default Checkout;
