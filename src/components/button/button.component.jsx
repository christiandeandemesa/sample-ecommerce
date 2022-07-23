import React from 'react';

import './button.styles.scss';

// Each button component.
function Button(props) {
	const {children, buttonType, ...otherProps} = props;

	const buttonTypeClasses = {
		google: 'google-sign-in',
		inverted: 'inverted'
	};

	return (
		// Dynamically changes the button's className depending on what buttonType was passed as props.
		<button className={`${buttonTypeClasses[buttonType]} button-container`} {...otherProps}>
			{children}
		</button>
	);
}

export default Button;
