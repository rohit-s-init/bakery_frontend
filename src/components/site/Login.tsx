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
  Mail as MailIcon
} from 'lucide-react';
import { useLoader } from '@/context/UniversalContext';
import { ApiResponse, LoginResponse, MeResponse } from '@/types/userdao.interface';
import { getMe, googleLogin, login } from '@/api/user';
import { useUser } from '@/context/User';
import { GoogleLogin } from "@react-oauth/google";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoaderVisible, setIsLoaderVisible } = useLoader();
  const { reloadUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // alert("pass");

    setIsLoaderVisible(true);
    console.log("inside the login");

    const resp: LoginResponse = await login({
      email: email,
      password: password
    });

    setIsLoaderVisible(false);

    // alert(JSON.stringify(resp));
    // alert("done");

    reloadUser();

    if (resp.success) {
      navigate({ to: "/" });
    }
    else {
      alert("invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] font-sans">


      <div style={{ marginTop: "50px" }}></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-[#efe6de] text-[#4d3529] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Welcome Back
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1f1713] leading-tight">
                Sign in to your
                <span className="text-[#c44536] block">Pastry Palette</span>
              </h1>
              <p className="text-[#4f3f36] mt-4 text-lg max-w-md">
                Access your orders, favorites, and personalized recommendations.
              </p>
            </div>

            {/* Bakery Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <MapPin className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Visit Us</p>
                  <p className="text-sm text-[#6b584b]">42 Rue de la Boulangerie</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <Clock className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Hours</p>
                  <p className="text-sm text-[#6b584b]">Tue–Sun: 7:30am – 7:00pm</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-[#f0e4db]">
                <div className="p-3 bg-[#f5eee8] rounded-xl">
                  <MailIcon className="h-5 w-5 text-[#c44536]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1f1713]">Email</p>
                  <p className="text-sm text-[#6b584b]">hello@pastrypalette.co</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block">
              <div className="w-20 h-1 bg-[#c44536] rounded-full"></div>
              <p className="text-sm text-[#6b584b] mt-2">"Every bite, a work of art."</p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#f0e4db] p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5eee8] rounded-2xl mb-4">
                <User className="h-8 w-8 text-[#c44536]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1f1713]">Welcome Back</h2>
              <p className="text-[#6b584b] text-sm mt-1">Sign in to continue your sweet journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#fcf9f5] border border-[#e5d6cb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]"
                    placeholder="you@example.com"
                    required
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-[#fcf9f5] border border-[#e5d6cb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c44536] focus:border-transparent transition-all text-[#1f1713] placeholder-[#6b584b]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6b584b] hover:text-[#2c241e] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#2c241e] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#e5d6cb] text-[#c44536] focus:ring-[#c44536] focus:ring-offset-0 cursor-pointer"
                  />
                  Remember me
                </label>
                <a href="#" className="text-sm text-[#c44536] hover:text-[#a83a2d] font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#c44536] text-white rounded-xl font-semibold hover:bg-[#a83a2d] transition-colors flex items-center justify-center gap-2 group"
              >
                Sign In
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
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      if (!credentialResponse.credential) return;

                      const result: MeResponse = await googleLogin(
                        credentialResponse.credential
                      );

                      console.log(result);

                      if (result.success) {
                        setIsLoaderVisible(true);
                        await reloadUser();
                        navigate({ to: "/" });
                        setIsLoaderVisible(false);
                      }
                      else {
                        alert(result.message);
                      }

                    }}
                    onError={() => {
                      alert("Login Failed");
                    }}
                  />
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

              {/* Sign up link */}
              <p className="text-center text-sm text-[#6b584b] mt-6">
                Don't have an account?{' '}

                <Link to="/register">
                  Create One
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LoginPage;