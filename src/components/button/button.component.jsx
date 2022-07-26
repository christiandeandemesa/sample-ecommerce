import React from 'react';

import Spinner from '../spinner/spinner.component';

import './button.styles.scss';

// Each button component.
function Button(props) {
	const {children, buttonType, isLoading, ...otherProps} = props;

	const buttonTypeClasses = {
		google: 'google-sign-in',
		inverted: 'inverted'
	};

	return (
		// Dynamically changes the button's className depending on what buttonType was passed as props, and the button is disabled if isLoading is true.
		<button
			disabled={isLoading}
			className={`${buttonTypeClasses[buttonType]} button-container`}
			{...otherProps}
		>
			{/* If isLoading is true, replace the button text with a spinner. */}
			{isLoading ? <Spinner /> : children}
		</button>
	);
}

export default Button;
