import React from 'react';

import {SpinnerContainer, SpinnerOverlay} from './spinner.styles.jsx';

// This is the spinner icon component.
function Spinner() {
	return (
		<SpinnerContainer>
			<SpinnerOverlay />
		</SpinnerContainer>
	);
}

export default Spinner;
