import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const religiousWeddings = [
    {
      id: 1,
      name: 'Christian Wedding',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3',
      description: 'Traditional church ceremonies with hymns, vows, and blessings',
      features: ['Church Ceremony', 'Minister Services', 'Choir Arrangements']
    },
    {
      id: 2,
      name: 'Hindu Wedding',
      image: 'https://images.unsplash.com/photo-1520854221256-17463ccb8b9d?ixlib=rb-4.0.3',
      description: 'Vedic rituals including Saptapadi and Mangalsutra ceremony',
      features: ['Mandap Setup', 'Pandit Services', 'Vedic Rituals']
    },
    {
      id: 3,
      name: 'Muslim Wedding',
      image: 'https://images.unsplash.com/photo-1521133573892-e44906baee46?ixlib=rb-4.0.3',
      description: 'Nikah ceremony with Maulvi and Islamic traditions',
      features: ['Nikah Ceremony', 'Mehndi', 'Walima Arrangements']
    },
    {
      id: 4,
      name: 'Sikh Wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3',
      description: 'Anand Karaj ceremony in Gurudwara',
      features: ['Gurudwara Booking', 'Granthi Services', 'Langar Arrangements']
    },
    {
      id: 5,
      name: 'Jewish Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3',
      description: 'Chuppah ceremony with Rabbi and traditional rituals',
      features: ['Chuppah Setup', 'Rabbi Services', 'Ketubah Preparation']
    },
    {
      id: 6,
      name: 'Buddhist Wedding',
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3',
      description: 'Simple ceremonies focusing on mindfulness and blessings',
      features: ['Monk Services', 'Meditation Setup', 'Traditional Rituals']
    }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <img 
            src={logo} 
            alt="Triunity Weddings & Events" 
            style={{ height: '120px', marginBottom: '30px' }}
          />
          <h1>Welcome to <span style={{ color: 'var(--primary-color)' }}>Triunity</span> Weddings & Events</h1>
          <p className="text-center">
            Celebrating love across all religions and cultures. Your perfect wedding, crafted with tradition and elegance.
          </p>
          <Link to="/booking" className="btn btn-primary btn-lg">
            Book Your Wedding
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        <input
          type="text"
          placeholder="Search for wedding types, venues, or services..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: '50px',
            padding: '15px 25px',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Religious Weddings Grid */}
      <div className="wedding-section">
        <h2 className="text-center mb-8">Wedding Ceremonies for All Religions</h2>
        <div className="wedding-grid">
          {religiousWeddings.map((wedding) => (
            <div key={wedding.id} className="wedding-card fade-in">
              <img src={wedding.image} alt={wedding.name} />
              <div className="wedding-card-content">
                <h3>{wedding.name}</h3>
                <p>{wedding.description}</p>
                <div className="wedding-features">
                  <h4>Features:</h4>
                  <ul>
                    {wedding.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/booking"
                  state={{ weddingType: wedding.name }}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" style={{ 
        backgroundColor: 'white', 
        borderRadius: '24px', 
        padding: '3rem', 
        margin: '3rem 0',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 className="text-center mb-8">Why Choose Triunity?</h2>
        <div className="grid-3">
          <div className="text-center">
            <div className="feature-icon" style={{
              backgroundColor: 'var(--primary-light)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem'
            }}>
              🏛️
            </div>
            <h3>All Religions Covered</h3>
            <p>Expertise in organizing weddings for every faith and tradition</p>
          </div>
          
          <div className="text-center">
            <div className="feature-icon" style={{
              backgroundColor: 'var(--primary-light)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem'
            }}>
              🔒
            </div>
            <h3>Secure Booking</h3>
            <p>Simple and secure booking process for your peace of mind</p>
          </div>
          
          <div className="text-center">
            <div className="feature-icon" style={{
              backgroundColor: 'var(--primary-light)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem'
            }}>
              ⭐
            </div>
            <h3>Premium Services</h3>
            <p>From venues to catering, we handle every detail with excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;