import {React, useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import Button from '../button/button.component';

import './product-card.styles.scss';

// Each product component.
function ProductCard(props) {
	const {product} = props;
	const {name, imageUrl, price} = product;

	const {addItemToCart} = useContext(CartContext);

	const addProductToCart = () => addItemToCart(product);

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
