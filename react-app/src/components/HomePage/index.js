import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink } from "react-router-dom"
import GetAllProducts from "../Products/GetAllProducts"; //grab images here for the frontpage tile view OR manually do it?
import "./HomePage.css"

function HomePage(){



    return(
        <>
        <div className="homepage-whole-container">
            <div className="first-quarter-container">
            <h2>'As interesting as a plant'</h2>

            <div class="button-container">
                <NavLink to={`/products`}>
                    <button class="shop-button">Shop Now</button>
                </NavLink>
            </div>
            </div>
        </div>
        </>
    )
}


export default HomePage;
