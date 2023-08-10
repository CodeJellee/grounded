import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
			<div className='header-container'>
				<div className="linkSet1">
					<div className="links" href="">Shop</div>
					<div className="links" href="">Workshops</div>
					<div className="links" href="">Articles</div>
					<div className="links" href="">About</div>
					<div className="links" href="">Contact</div>
				</div>
				<div className='title-link'>
					<NavLink exact to="/" className='title-link'>grounded.</NavLink>
				</div>
				{isLoaded && (
					<div className='title-login'>
						<ProfileButton user={sessionUser} className='login-link'/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;

{/* <div className="linkSet2">
<div className="login" href="">Login</div>
<div className="insta" href="">
	<img className="insta-icon" src="/SoilBoy/insta.png"/>
</div>
<div className="cart" href="">
	<img className="cart-img" src="/SoilBoy/cart.png"/>
</div> */}
