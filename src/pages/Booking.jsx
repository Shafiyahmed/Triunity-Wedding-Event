import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth } from '../utils/auth';

const religiousWeddings = [
  { id: 'christian', name: 'Christian Wedding' },
  { id: 'hindu', name: 'Hindu Wedding' },
  { id: 'muslim', name: 'Muslim Wedding (Nikah)' },
  { id: 'sikh', name: 'Sikh Wedding (Anand Karaj)' },
  { id: 'jewish', name: 'Jewish Wedding' },
  { id: 'buddhist', name: 'Buddhist Wedding' },
  { id: 'interfaith', name: 'Interfaith Wedding' },
  { id: 'civil', name: 'Civil Ceremony' },
];

const additionalServices = [
  { id: 'photography', name: 'Professional Photography', price: 1500 },
  { id: 'videography', name: 'Videography', price: 2000 },
  { id: 'catering', name: 'Premium Catering', price: 5000 },
  { id: 'decor', name: 'Wedding Decorations', price: 3000 },
  { id: 'music', name: 'Live Music Band', price: 2500 },
  { id: 'limo', name: 'Luxury Limousine', price: 800 },
  { id: 'makeup', name: 'Bridal Makeup & Hair', price: 1200 },
  { id: 'security', name: 'Event Security', price: 1000 },
];

const Booking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [guestCount, setGuestCount] = useState(50);
  const [step, setStep] = useState(1);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0) + (guestCount * 100);

  const handleServiceToggle = (service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    try {
      const currentUser = auth.getCurrentUser();
      const bookingData = {
        ...data,
        date: selectedDate.toISOString(),
        services: selectedServices,
        guestCount,
        totalPrice,
        userId: currentUser?.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        bookingId: 'BOOK-' + Date.now().toString().slice(-8).toUpperCase(),
      };

      // Save booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('triunity_bookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('triunity_bookings', JSON.stringify(existingBookings));
      
      toast.success('Booking created successfully!');
      
      // Navigate to summary
      navigate('/booking-summary', { state: bookingData });
    } catch (error) {
      toast.error('Error creating booking: ' + error.message);
    }
  };

  return (
    <div className="container booking-container">
      <div className="card card-lg">
        <h1 className="text-center">Book Your Wedding</h1>
        <p className="text-center" style={{ color: 'var(--gray-dark)', marginBottom: '2rem' }}>
          Fill in the details for your perfect wedding ceremony
        </p>

        {/* Progress Steps */}
        <div className="booking-steps">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`step ${s === step ? 'active' : s < step ? 'completed' : ''}`}>
                <div className="step-number">{s}</div>
              </div>
              {s < 3 && <div className="step-line"></div>}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="booking-form-section">
              <h2>Basic Information</h2>
              
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Bride's Full Name *</label>
                  <input
                    type="text"
                    {...register('brideName', { required: 'Bride name is required' })}
                    className={`form-control ${errors.brideName ? 'error' : ''}`}
                  />
                  {errors.brideName && (
                    <p className="error-message">{errors.brideName.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Groom's Full Name *</label>
                  <input
                    type="text"
                    {...register('groomName', { required: 'Groom name is required' })}
                    className={`form-control ${errors.groomName ? 'error' : ''}`}
                  />
                  {errors.groomName && (
                    <p className="error-message">{errors.groomName.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Email *</label>
                <input
                  type="email"
                  {...register('contactEmail', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`form-control ${errors.contactEmail ? 'error' : ''}`}
                />
                {errors.contactEmail && (
                  <p className="error-message">{errors.contactEmail.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone *</label>
                <input
                  type="tel"
                  {...register('contactPhone', { 
                    required: 'Phone is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone must be 10 digits'
                    }
                  })}
                  className={`form-control ${errors.contactPhone ? 'error' : ''}`}
                />
                {errors.contactPhone && (
                  <p className="error-message">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="booking-form-section">
              <h2>Ceremony Details</h2>

              <div className="form-group">
                <label className="form-label">Wedding Type *</label>
                <select
                  {...register('weddingType', { required: 'Wedding type is required' })}
                  className={`form-control ${errors.weddingType ? 'error' : ''}`}
                >
                  <option value="">Select a wedding type</option>
                  {religiousWeddings.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.weddingType && (
                  <p className="error-message">{errors.weddingType.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Wedding Date *</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  minDate={new Date()}
                  className="form-control"
                  placeholderText="Select a date"
                  dateFormat="MMMM d, yyyy"
                />
                {!selectedDate && (
                  <p className="error-message">Please select a date</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <div className="flex items-center" style={{ gap: '1rem', marginTop: '0.5rem' }}>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: 'var(--secondary-color)',
                    minWidth: '80px'
                  }}>
                    {guestCount} Guests
                  </span>
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--gray-medium)', 
                  marginTop: '0.5rem' 
                }}>
                  Base price: ${guestCount * 100} (${100} per guest)
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requirements</label>
                <textarea
                  {...register('specialRequirements')}
                  rows="4"
                  className="form-control"
                  placeholder="Any special religious requirements, dietary restrictions, or other notes..."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="booking-form-section">
              <h2>Additional Services</h2>

              <div className="services-grid">
                {additionalServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service)}
                    className={`service-item ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 style={{ marginBottom: '0.25rem' }}>{service.name}</h4>
                        <p className="service-price">${service.price}</p>
                      </div>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: selectedServices.find(s => s.id === service.id) 
                          ? 'var(--primary-color)' 
                          : 'var(--gray-medium)',
                        backgroundColor: selectedServices.find(s => s.id === service.id) 
                          ? 'var(--primary-color)' 
                          : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {selectedServices.find(s => s.id === service.id) && (
                          <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="price-summary" style={{
                backgroundColor: 'var(--gray-light)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h3>Price Summary</h3>
                <div style={{ marginTop: '1rem' }}>
                  <div className="flex justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-medium)' }}>
                    <span>Base Price ({guestCount} guests):</span>
                    <span style={{ fontWeight: '600' }}>${guestCount * 100}</span>
                  </div>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-medium)' }}>
                      <span>{service.name}:</span>
                      <span style={{ fontWeight: '600' }}>${service.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between" style={{ 
                    paddingTop: '1rem', 
                    marginTop: '1rem',
                    borderTop: '2px solid var(--dark-color)'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Total:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-outline"
              >
                Previous
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
                style={{ marginLeft: 'auto' }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                style={{ 
                  backgroundColor: 'var(--success-color)',
                  marginLeft: 'auto'
                }}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;