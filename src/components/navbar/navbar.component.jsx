import {React, useContext} from 'react';

import {Link, Outlet} from 'react-router-dom';

import {signOutUser} from '../../utils/firebase/firebase.utils';

import {UserContext} from '../../contexts/user.context';
import {CartContext} from '../../contexts/cart.context';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'; // Imports the SVG icon as a component.

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './navbar.styles.scss';

// This is the navigation bar component.
function Navbar() {
	// Takes the currentUser from the useContext object.
	const {currentUser} = useContext(UserContext);
	const {isCartOpen} = useContext(CartContext);

	return (
		// Use of fragment tag.
		<>
			<div className='navigation'>
				<Link to='/' className='logo-container'>
					<CrwnLogo className='logo' />
				</Link>

				<div className='nav-links-container'>
					<Link to='/shop' className='nav-link'>
						SHOP
					</Link>

					{/* If currentUser is not null, render the SIGN OUT link. If currentUser is null, render the SIGN IN link. */}
					{currentUser ? (
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link to='/auth' className='nav-link'>
							SIGN IN
						</Link>
					)}

					<CartIcon />
				</div>

				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet /> {/* Outlet renders the current Link that was selected */}
		</>
	);
}

export default Navbar;
