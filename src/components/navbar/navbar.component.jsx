import {React, useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {signOutUser} from '../../utils/firebase/firebase.utils';

import {selectCurrentUser} from '../../store/user/user.selector';

import {CartContext} from '../../contexts/cart.context';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'; // Imports the SVG icon as a component.

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLinkContainer
} from './navbar.styles.jsx';

// This is the navigation bar component.
function Navbar() {
	// Takes the currentUser from the useContext object.
	const currentUser = useSelector(selectCurrentUser);
	const {isCartOpen} = useContext(CartContext);

	return (
		<>
			{/* Example of using a styled component. */}
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>

				<NavLinksContainer>
					<NavLinkContainer to='/shop'>SHOP</NavLinkContainer>

					{/* If currentUser is not null, render the SIGN OUT link. If currentUser is null, render the SIGN IN link. */}
					{currentUser ? (
						// Renders the NavLinkContainer as a span element instead of a Link.
						<NavLinkContainer as='span' onClick={signOutUser}>
							SIGN OUT
						</NavLinkContainer>
					) : (
						<NavLinkContainer to='/auth'>SIGN IN</NavLinkContainer>
					)}

					<CartIcon />
				</NavLinksContainer>

				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet /> {/* Outlet renders the current Link that was selected */}
		</>
	);
}

export default Navbar;
