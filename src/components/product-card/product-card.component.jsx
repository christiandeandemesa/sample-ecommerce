import {React} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addItemToCart} from '../../store/cart/cart.action';
import {selectCartItems} from '../../store/cart/cart.selector';

import Button from '../button/button.component';

import './product-card.styles.scss';

// Each product component.
function ProductCard(props) {
	const {product} = props;
	const {name, imageUrl, price} = product;

	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);

	// This function adds an item to the cart.
	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={name} />

			<div className='footer'>
				<span className='name'>{name}</span>

				<span className='price'>{price}</span>
			</div>

			<Button onClick={addProductToCart} buttonType='inverted'>
				Add to cart
			</Button>
		</div>
	);
}

export default ProductCard;
