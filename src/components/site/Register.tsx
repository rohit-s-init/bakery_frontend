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
import { googleLogin, register, verify } from '@/api/user';
import { ApiResponse, MeResponse } from '@/types/userdao.interface';
import Loader from '../ui/loader';
import { useLoader } from '@/context/UniversalContext';
import { useUser } from '@/context/User';
import { GoogleLogin } from '@react-oauth/google';
import ReactGA from "react-ga4";


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
      try {
        ReactGA.event("sign_up", {
          method: "email_password",
        });
      } catch (error) {
        console.log(error);
      }
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
              {/* Social Login */}
              <div className="w-full flex justify-center">
                <GoogleLogin
                  text="signin_with"
                  onSuccess={async (credentialResponse) => {
                    if (!credentialResponse.credential) return;

                    setIsLoaderVisible(true);

                    try {
                      const result: MeResponse = await googleLogin(
                        credentialResponse.credential
                      );

                      console.log(result);

                      if (result.success) {
                        await reloadUser();
                        navigate({ to: "/" });
                      } else {
                        alert(result.message);
                      }

                      try {
                        ReactGA.event("sign_up", {
                          method: "google",
                        });
                      } catch (error) {
                        console.log(error);
                      }

                    } finally {
                      setIsLoaderVisible(false);
                    }
                  }}
                  onError={() => {
                    alert("Google Login Failed");
                  }}
                />
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