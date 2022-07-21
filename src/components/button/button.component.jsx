import React from 'react';

import './button.styles.scss';

function Button({children, buttonType, ...otherProps}) {
	const buttonTypeClasses = {
		google: 'google-sign-in',
		inverted: 'inverted'
	};

	return (
		<button className={`${buttonTypeClasses[buttonType]} button-container`} {...otherProps}>
			{children}
		</button>
	);
}

export default Button;
