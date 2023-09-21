import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Footer from '../../Footer';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const featureComingSoonClick = () => {
        alert("Feature coming soon!");
    };

	return (
		<div>
			<div className='header-container'>
				<div className="linkSet1">
					<NavLink className="links" to={`/products`}>
						<div className="links" href="">Shop</div>
					</NavLink>
					<NavLink className="links" to={`/articles`}>
						<div className="links" href="">Articles</div>
					</NavLink>
					<div className="links" href="" onClick={featureComingSoonClick}>Workshops</div>
					<div className="links" href=""onClick={featureComingSoonClick}>About</div>
					<div className="links" href=""onClick={featureComingSoonClick}>Contact</div>
				</div>
				<div className='title-link'>
					<NavLink exact to="/" className='title-link'>grounded.</NavLink>
				</div>
				<div className='header-login-insta-cart links'>
					{isLoaded && (
						<div className='title-login'>
							<ProfileButton user={sessionUser} className='login-link'/>
						</div>
					)}
					<div>
						<NavLink exact to="/products/current">
							<i className="fas fa-leaf links"></i>
						</NavLink>
					</div>
					<div>
						<NavLink exact to="/carts">
							<i className="fas fa-shopping-cart links" />
						</NavLink>
					</div>
				</div>
			</div>
			<div className='footer-container'>
				<Footer />
			</div>
		</div>
	);
}

export default Navigation;
