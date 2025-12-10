import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="logo mb-4">
              <div className="logo-text">TRIUNITY</div>
            </div>
            <p className="mb-6">
              Celebrating love across all religions and cultures. Your perfect wedding, crafted with tradition and elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent-gold transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-gold transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-accent-gold transition duration-300">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking">
                  Book Wedding
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Religious Weddings */}
          <div className="footer-section">
            <h4>Wedding Types</h4>
            <ul>
              <li>Christian Wedding</li>
              <li>Hindu Wedding</li>
              <li>Muslim Wedding (Nikah)</li>
              <li>Sikh Wedding (Anand Karaj)</li>
              <li>Jewish Wedding</li>
              <li>Buddhist Wedding</li>
              <li>Interfaith Ceremony</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent-gold mt-1 flex-shrink-0" />
                <span>123 Wedding Boulevard, Celebration City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-accent-gold" />
                <span>+91 7010480318</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent-gold" />
                <span>info@triunityweddings.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Business Hours</h5>
              <p className="text-sm">Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p className="text-sm">Saturday - Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Triunity Weddings & Events. All rights reserved.
          </span>
          <div className="flex justify-center gap-6 mt-2">
            <span className="text-accent-gold">
              Privacy Policy
            </span>
            <span className="text-accent-gold">
              Terms of Service
            </span>
            <span className="text-accent-gold">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
