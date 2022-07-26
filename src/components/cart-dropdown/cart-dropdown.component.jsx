import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {selectCartItems} from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

// This is the cart dropdown menu component.
function CartDropdown() {
	const cartItems = useSelector(selectCartItems);

	const navigate = useNavigate();

	// This function navigates to a route.
	const goToCheckoutHandler = () => {
		if (cartItems.length > 0) navigate('checkout');
		else alert('Your cart is empty.');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map(item => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
}

export default CartDropdown;
