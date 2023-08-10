import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom"
import GetAllProducts from "../Products/GetAllProducts"; //grab images here for the frontpage tile view OR manually do it?
import "./HomePage.css"

function HomePage(){



    return(
        <>
        {/* <div className="header-container">
            <div className="linkSet1">
                <div className="links" href="">Shop</div>
                <div className="links" href="">Workshops</div>
                <div className="links" href="">Articles</div>
                <div className="links" href="">About</div>
                <div className="links" href="">Contact</div>
            </div>

            <h1>grounded.</h1>

            <div className="linkSet2">
                <div className="login" href="">Login</div>
                <div className="insta" href="">
                    <img className="insta-icon" src="/SoilBoy/insta.png"/>
                </div>
                <div className="cart" href="">
                    <img className="cart-img" src="/SoilBoy/cart.png"/>
                </div>
            </div>

        </div> */}
        </>
    )
}


export default HomePage;
