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
					<NavLink to={`/products`}>
						<div className="links" href="">Shop</div>
					</NavLink>
					<div className="links" href="">Workshops</div>
					<div className="links" href="">Articles</div>
					<div className="links" href="">About</div>
					<div className="links" href="">Contact</div>
				</div>
				<div className='title-link'>
					<NavLink exact to="/" className='title-link'>grounded.</NavLink>
				</div>
				<div className='header-login-insta-cart'>
					{isLoaded && (
						<div className='title-login'>
							<ProfileButton user={sessionUser} className='login-link'/>
						</div>
					)}
					<div>
						<i className="fa-brands fa-instagram"></i>
					</div>
					<div>
						<i className="fas fa-shopping-cart" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
