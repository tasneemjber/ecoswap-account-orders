import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>EcoSwap</h3>
          <p>
            © 2024 EcoSwap Marketplace. All rights
            <br />
            reserved.
          </p>
        </div>

        <div className="footer-column">
          <h4>Discover</h4>
          <Link to="/about">About Us</Link>
          <Link to="/sell">Sell an Item</Link>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <Link to="/sustainability">Sustainability</Link>
          <Link to="/help">Help Center</Link>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
