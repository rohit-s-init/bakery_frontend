import React, { useState } from 'react';
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Utensils,
  Home,
  Info,
  Briefcase,
  Image,
  PenSquare,
  Phone,
  MapPin,
  Clock,
  Mail as MailIcon,
  Check,
  X,
  UserPlus,
  Calendar,
  AlertCircle
} from 'lucide-react';
import OTPPopup from '../ui/otp';
import { register, verify } from '@/api/user';
import { ApiResponse } from '@/types/userdao.interface';
import Loader from '../ui/loader';
import { useLoader } from '@/context/UniversalContext';
import { useUser } from '@/context/User';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoaderVisible, setIsLoaderVisible } = useLoader();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { reloadUser } = useUser();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {

      setIsLoaderVisible(true);

      console.log('Registration attempt:', formData);

      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      })

      setIsOTPVisible(true);
      setIsLoaderVisible(false);

      // Handle registration logic here
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    const strengthMap = [
      { score: 0, label: 'Weak', color: 'bg-red-500' },
      { score: 1, label: 'Weak', color: 'bg-red-400' },
      { score: 2, label: 'Fair', color: 'bg-yellow-500' },
      { score: 3, label: 'Good', color: 'bg-blue-500' },
      { score: 4, label: 'Strong', color: 'bg-green-500' }
    ];

    return strengthMap[score] || strengthMap[0];
  };

  const passwordStrength = getPasswordStrength();

  const [isOTPVisible, setIsOTPVisible] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (otp: string) => {
    console.log('OTP entered:', otp);
    // alert(`OTP Verified: ${otp}`);
    console.log(otp, formData);
    setIsOTPVisible(false);

    setIsLoaderVisible(true);

    const resp: ApiResponse = await verify({
      email: formData.email,
      otp: parseInt(otp)
    });



    if (resp.success) {
      navigate({ to: "/" });
      await reloadUser();
    }
    else {
      alert(resp.message);
    }

    setIsLoaderVisible(false);


  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] font-sans">

      <div style={{ marginTop: "50px" }}></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Branding */}
          <div className="space-y-8 sticky top-24">
            <div>
              <div className="inline-block bg-[#efe6de] text-[#4d3529] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Join Our Community
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1f1713] leading-tight">
                Create your
                <span className="text-[#c44536] block">Pastry Palette</span>
              </h1>
              <p className="text-[#4f3f36] mt-4 text-lg max-w-md">
                Start your sweet journey with us. Get exclusive offers, birthday treats, and more.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <UserPlus className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Member Benefits</p>
                  <p className="text-sm text-[#6b584b]">Exclusive discounts & early access</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <Calendar className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Birthday Treat</p>
                  <p className="text-sm text-[#6b584b]">Free pastry on your special day</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <MailIcon className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Newsletter</p>
                  <p className="text-sm text-[#6b584b]">Fresh recipes & seasonal updates</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block">
              <div className="w-20 h-1 bg-[#c44536] rounded-full"></div>
              <p className="text-sm text-[#6b584b] mt-2">"Every bite, a work of art."</p>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#f0e4db] p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5eee8] rounded-2xl mb-4">
                <UserPlus className="h-8 w-8 text-[#c44536]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1f1713]">Create Account</h2>
              <p className="text-[#6b584b] text-sm mt-1">Join the Pastry Palette family</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#2c241e] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#6b584b]" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#fcf9f5] border ${errors.fullName ? 'border-red-400' : 'border-[#e5d6cb]'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#2c241e] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#6b584b]" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-[#fcf9f5] border ${errors.email ? 'border-red-400' : 'border-[#e5d6cb]'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#2c241e] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#6b584b]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-[#fcf9f5] border ${errors.password ? 'border-red-400' : 'border-[#e5d6cb]'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6b584b] hover:text-[#2c241e] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.password}</span>
                  </div>
                )}

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-all ${level <= passwordStrength.score + 1
                            ? passwordStrength.color
                            : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#6b584b]">
                      Password strength: <span className="font-medium">{passwordStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#2c241e] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#6b584b]" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-[#fcf9f5] border ${errors.confirmPassword ? 'border-red-400' : 'border-[#e5d6cb]'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6b584b] hover:text-[#2c241e] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-[#e5d6cb] text-[#c44536] focus:ring-[#c44536] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                />
                <div>
                  <label className="text-sm text-[#2c241e] cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-[#c44536] hover:text-[#a83a2d] font-medium transition-colors">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-[#c44536] hover:text-[#a83a2d] font-medium transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.acceptTerms}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#c44536] text-white rounded-xl font-semibold hover:bg-[#a83a2d] transition-colors flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>


              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#f0e4db]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#6b584b]">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border border-[#e5d6cb] rounded-xl hover:bg-[#fcf9f5] transition-colors text-[#2c241e] font-medium"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#4285F4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border border-[#e5d6cb] rounded-xl hover:bg-[#fcf9f5] transition-colors text-[#2c241e] font-medium"
                >
                  <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-[#6b584b] mt-6">
                Already have an account?{' '}
                <a href="#" className="text-[#c44536] hover:text-[#a83a2d] font-medium transition-colors">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <OTPPopup
        isVisible={isOTPVisible}
        setIsVisible={setIsOTPVisible}
        onVerify={handleVerify}
      />

    </div>
  );
};

export default RegisterPage;