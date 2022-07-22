import React from 'react';

import './form-input.styles.scss';

// Each form input component.
function FormInput(props) {
	// ...otherProps are the other props passed in that is not label.
	const {label, ...otherProps} = props;

	return (
		<div className='group'>
			<input className='form-input' {...otherProps} />

			{/* If label exists, create the label element. */}
			{label && (
				<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
					{label}
				</label>
			)}
		</div>
	);
}

export default FormInput;
