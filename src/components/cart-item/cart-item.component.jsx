import React from 'react';

// Each item in the cart component.
function CartItem(props) {
	const {cartItem} = props;
	const {name, quantity} = cartItem;

	return (
		<div>
			<h2>{name}</h2>
			<span>{quantity}</span>
		</div>
	);
}

export default CartItem;
