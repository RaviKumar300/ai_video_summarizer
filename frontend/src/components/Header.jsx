import './Header.css';
import logo_transp from '../assets/situs_logo_tr.png'

function Header() {


    return (
        <div className="header">
            <div className="introd">
                <div className="logo">
                    <img src={logo_transp} alt="" />
                </div>
                <div className="companyname">
                    Quad Tools
                </div>
                <div className="blank">
                    /* nothing */
                </div>
                <div className="search">
                    <input type="text" placeholder="Search Quad Tools..." />
                    <button>🔍</button>
                </div>
                <div className="blank">
                    /* nothing */
                </div>
                <div className="theme_switch">
                    🌙
                </div>
                <div className="login">
                    <button>Login</button>
                </div>
                <div className="signin">
                    <button>Signup</button>
                </div>
            </div>
            <div className="uarehere">
                You are here:&nbsp; <span>Home</span>&nbsp;→&nbsp;<span>Quad Tools</span>&nbsp; → &nbsp;<span>Video Summarizer</span>
            </div>

        </div>
    );

}

export default Header