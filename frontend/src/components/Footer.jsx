import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2>Quad Tools</h2>
                    <p>Empowering productivity with smart AI tools.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Tools</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h5>Contact</h5>
                    <p>Email: support@quadtools.ai</p>
                    <p>Phone: +91 12345 67890</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Quad Tools. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
