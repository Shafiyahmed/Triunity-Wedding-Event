import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { auth } from '../../utils/auth';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = auth.signIn(data.email, data.password);
      
      if (result.success) {
        toast.success('Signed in successfully!');
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
          <h2 className="text-3xl font-bold text-secondary-color">Welcome Back</h2>
          <p className="text-gray-dark mt-2">Sign in to your Triunity account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="form-control"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-light rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-dark">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary-color hover:text-primary-dark transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-dark">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-color font-semibold hover:text-primary-dark transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
