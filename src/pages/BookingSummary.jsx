import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPrint, FaDownload, FaShareAlt } from 'react-icons/fa';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    navigate('/booking');
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download
    toast.info('PDF download feature coming soon!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl print:p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 print:shadow-none"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-600">
            Your wedding booking has been successfully submitted
          </p>
          <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
            Booking ID: {bookingData.bookingId?.substring(0, 8).toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
              Couple Information
            </h2>
            <div>
              <p className="text-gray-600">Bride</p>
              <p className="text-xl font-semibold text-gray-800">
                {bookingData.brideName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Groom</p>
              <p className="text-xl font-semibold text-gray-800">
                {bookingData.groomName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Contact Email</p>
              <p className="text-lg text-gray-800">{bookingData.contactEmail}</p>
            </div>
            <div>
              <p className="text-gray-600">Contact Phone</p>
              <p className="text-lg text-gray-800">{bookingData.contactPhone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
              Ceremony Details
            </h2>
            <div>
              <p className="text-gray-600">Wedding Type</p>
              <p className="text-xl font-semibold text-gray-800">
                {bookingData.weddingType}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Wedding Date</p>
              <p className="text-lg text-gray-800">
                {formatDate(bookingData.date)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Number of Guests</p>
              <p className="text-lg text-gray-800">{bookingData.guestCount}</p>
            </div>
            {bookingData.specialRequirements && (
              <div>
                <p className="text-gray-600">Special Requirements</p>
                <p className="text-lg text-gray-800">
                  {bookingData.specialRequirements}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
            Services Selected
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span>Base Price ({bookingData.guestCount} guests):</span>
              <span className="font-semibold">
                ${bookingData.guestCount * 100}
              </span>
            </div>
            {bookingData.services?.map((service) => (
              <div key={service.id} className="flex justify-between border-b pb-2">
                <span>{service.name}:</span>
                <span className="font-semibold">${service.price}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 border-t-2 border-gray-800">
              <span className="text-xl font-bold">Total Amount:</span>
              <span className="text-2xl font-bold text-rose-600">
                ${bookingData.totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Next Steps
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Our wedding coordinator will contact you within 24 hours</li>
            <li>50% deposit required to confirm the booking</li>
            <li>Final payment due 7 days before the wedding</li>
            <li>Final meeting scheduled 2 weeks before the ceremony</li>
          </ol>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
          >
            <FaPrint /> Print Summary
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            <FaShareAlt /> View in Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSummary;