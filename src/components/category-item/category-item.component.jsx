import React from 'react';

import {Link} from 'react-router-dom';

import './category-item.styles.scss';

// Each category component on the home page.
function CategoryItem(props) {
	const {imageUrl, title} = props.category;

	return (
		<div className='directory-container'>
			<div
				className='background-image'
				style={{
					backgroundImage: `url(${imageUrl})`
				}}
			/>
			<div className='category-body-container'>
				{/* Example of redirecting toward the dynamic route. */}
				<Link to={`shop/${title}`} className='Title'>
					<h2>{title.toUpperCase()}</h2>
					<p>Shop Now</p>
				</Link>
			</div>
		</div>
	);
}

export default CategoryItem;
