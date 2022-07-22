import React from 'react';

import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

// This is the cart dropdown menu component.
function CartDropdown() {
	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'></div>
			<Button>GO TO CHECKOUT</Button>
		</div>
	);
}

export default CartDropdown;
