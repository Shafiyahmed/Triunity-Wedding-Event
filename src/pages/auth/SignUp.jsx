import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { auth } from '../../utils/auth';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = auth.signUp(data);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-cream to-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-primary-light/20">
        <div className="text-center mb-8">
          <div className="logo mb-6 justify-center">
            <div className="logo-text">TRIUNITY</div>
          </div>
          <h2 className="text-3xl font-bold text-secondary-color">Create Account</h2>
          <p className="text-gray-dark mt-2">Join Triunity for your perfect wedding</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">
                First Name
              </label>
              <input
                type="text"
                {...register('firstName')}
                className="form-control"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                className="form-control"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Phone
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="form-control"
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="form-control"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="form-control"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-dark">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary-color font-semibold hover:text-primary-dark transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
