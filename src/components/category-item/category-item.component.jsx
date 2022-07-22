import React from 'react';

import './category-item.styles.scss';

// This each category component (e.g. hats).
function CategoryItem(props) {
	const {imageUrl, title} = props.category;

	return (
		<div className='category-container'>
			<div
				className='background-image'
				style={{
					backgroundImage: `url(${imageUrl})`
				}}
			/>
			<div className='category-body-container'>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
}

export default CategoryItem;
