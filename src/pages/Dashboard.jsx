import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserCircle, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { auth } from '../utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    
    setUser(currentUser);
    
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('triunity_bookings') || '[]');
    const userBookings = storedBookings.filter(
      booking => booking.userId === currentUser.id
    );
    setBookings(userBookings);
  }, [navigate]);

  const handleSignOut = () => {
    auth.signOut();
    navigate('/signin');
  };

  if (!user) return null;

  return (
    <div className="app">
      <main className="main">
        <div className="container py-8">
          <div className="card-lg">
            {/* Header */}
            <div className="dashboard-header mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h1 className="mb-2">Welcome, {user.firstName}!</h1>
                  <span className="opacity-90">Your Wedding Planning Dashboard</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline mt-4 md:mt-0 flex items-center gap-2"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderColor: 'white'}}
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>

           <div className="flex flex-col md:flex-row gap-6">
  {/* Sidebar */}
  <div className="md:w-1/4">
    <div className="dashboard-sidebar">
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`dashboard-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <FaUserCircle className="dashboard-nav-icon" />
          <span className="font-medium">Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`dashboard-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
        >
          <FaCalendarAlt className="dashboard-nav-icon" />
          <span className="font-medium">My Bookings</span>
          <span className="dashboard-nav-badge">
            {bookings.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`dashboard-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <FaCog className="dashboard-nav-icon" />
          <span className="font-medium">Profile Settings</span>
        </button>
      </div>
    </div>
  </div>

              {/* Main Content */}
              <div className="md:w-3/4">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-secondary-color">Dashboard Overview</h2>
                    
                    <div className="stats-grid">
                      <div className="stat-card">
                        <h3 className="stat-label">Total Bookings</h3>
                        <p className="stat-number">{bookings.length}</p>
                        <p className="text-gray-medium text-sm">All wedding events</p>
                      </div>
                      
                      <div className="stat-card">
                        <h3 className="stat-label">Upcoming Events</h3>
                        <p className="stat-number" style={{color: 'var(--secondary-light)'}}>
                          {bookings.filter(b => new Date(b.date) > new Date()).length}
                        </p>
                        <p className="text-gray-medium text-sm">Future ceremonies</p>
                      </div>
                      
                      <div className="stat-card">
                        <button
                          onClick={() => navigate('/booking')}
                          className="text-left w-full group"
                        >
                          <h3 className="stat-label">Create New Booking</h3>
                          <div className="flex items-center gap-2">
                            <p className="stat-number" style={{color: 'var(--accent-gold)'}}>
                              <FaPlus className="inline" />
                            </p>
                            <span className="text-primary-color font-semibold group-hover:text-primary-dark transition-colors">
                              Start planning
                            </span>
                          </div>
                          <p className="text-gray-medium text-sm">Book your perfect wedding</p>
                        </button>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-xl font-bold text-secondary-color mb-6">
                        Recent Bookings
                      </h3>
                      {bookings.length > 0 ? (
                        <div className="space-y-4">
                          {bookings.slice(0, 3).map((booking, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition duration-300"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-semibold text-secondary-color mb-1">
                                    {booking.weddingType}
                                  </h4>
                                  <p className="text-gray-dark text-sm">
                                    {new Date(booking.date).toLocaleDateString('en-US', { 
                                      weekday: 'long',
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-primary-color text-xl mb-1">
                                    ${booking.totalPrice.toLocaleString()}
                                  </p>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    booking.status === 'confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : booking.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-dark mb-6">
                            No bookings yet. Create your first wedding booking!
                          </p>
                          <button
                            onClick={() => navigate('/booking')}
                            className="btn btn-primary"
                          >
                            Start Your Wedding Journey
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-secondary-color">
                        My Bookings
                      </h2>
                      <button
                        onClick={() => navigate('/booking')}
                        className="btn btn-primary"
                      >
                        + New Booking
                      </button>
                    </div>
                    {bookings.length > 0 ? (
                      <div className="space-y-6">
                        {bookings.map((booking, index) => (
                          <div
                            key={index}
                            className="wedding-card"
                          >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-secondary-color mb-2">
                                  {booking.brideName} & {booking.groomName}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                  <span className="text-gray-dark flex items-center gap-1">
                                    <strong>Type:</strong> {booking.weddingType}
                                  </span>
                                  <span className="text-gray-dark flex items-center gap-1">
                                    <strong>Date:</strong>{' '}
                                    {new Date(booking.date).toLocaleDateString()}
                                  </span>
                                  <span className="text-gray-dark flex items-center gap-1">
                                    <strong>Guests:</strong> {booking.guestCount}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary-color mb-2">
                                  ${booking.totalPrice.toLocaleString()}
                                </p>
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                  booking.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : booking.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                            {booking.specialRequirements && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-700">
                                  <strong>Special Requirements:</strong>{' '}
                                  {booking.specialRequirements}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="card text-center py-12">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-secondary-color mb-2">
                            No Bookings Yet
                          </h3>
                          <p className="text-gray-dark mb-6">
                            Start planning your perfect wedding journey with us.
                          </p>
                        </div>
                        <button
                          onClick={() => navigate('/booking')}
                          className="btn btn-primary btn-lg"
                        >
                          Book Your First Wedding
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-color mb-6">
                      Profile Settings
                    </h2>
                    <div className="card">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="form-label">Full Name</label>
                              <p className="form-control bg-gray-50">{user.firstName} {user.lastName}</p>
                            </div>
                            <div>
                              <label className="form-label">Email</label>
                              <p className="form-control bg-gray-50">{user.email}</p>
                            </div>
                            <div>
                              <label className="form-label">Phone</label>
                              <p className="form-control bg-gray-50">{user.phone || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                          <div className="space-y-3">
                            <button className="btn btn-outline w-full">
                              Change Password
                            </button>
                            <button className="btn btn-outline w-full">
                              Update Profile
                            </button>
                            <button className="btn btn-outline w-full">
                              Notification Settings
                            </button>
                            <button 
                              onClick={handleSignOut}
                              className="btn btn-secondary w-full"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
