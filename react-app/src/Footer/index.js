import "./Footer.css"
import { Link } from "react-router-dom"

function Footer(){
    return (
    <div className="foots">
        <div className="footer1">
            <div className="foot1">
                <img src="https://m.media-amazon.com/images/I/51froJYdRmL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="meaningful text"></img>
                <p>United States</p>
                <p>|</p>
                <p>English (US)</p>
            </div>
            <div className="about">
                <p >Developer: </p>
                <p className="about-info">Jennifer Lee
                    <a target="_blank" href="https://github.com/CodeJellee" className="icons" class="fab fa-github"></a>
                    <a target="_blank" href="www.linkedin.com/in/lee-pac-swe" className="icons" class="fab fa-linkedin"></a>
                    <a target="_blank" href="https://golden-youtiao-d50c5f.netlify.app/" className="icons" class="fa fa-user-circle"></a>
                </p>
            </div>
            <div className="foot1">
                <p>© 2023 grounded, Inc.</p>
            </div>
        </div>
    </div>
    )
}

export default Footer
