import {React} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

// This is the cart icon component.
function CartIcon() {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	// This function opens or closes the cart dropdown menu.
	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
}

export default CartIcon;
