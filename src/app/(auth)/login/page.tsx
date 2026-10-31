"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    console.log("Logged In User Data:", {
      email,
      password,
    });

    setSuccessMessage("Login successful! Check console for output.");
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleGoogleLogin = () => {
    console.log("Google Social Auth Triggered");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8 lg:p-12 items-center">
        
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage your events, track joined community drives, and stay connected.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border border-slate-200/60 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rumi@example.com"
                className="w-full bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none"
              />
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border border-slate-200/60 dark:border-slate-800 relative">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Password
              </label>
              <div className="flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md shadow-emerald-600/20"
            >
              Log In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-slate-950 px-3 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FaGoogle className="w-4 h-4 text-emerald-600" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
            {`Don't have an account?`}{" "}
            <Link href="/sign-up" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="hidden lg:block relative h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop"
            alt="Community Leadership"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Empowering Social Change</h2>
            <p className="text-sm text-slate-300 max-w-md">
              Log in to manage community workshops, organize local initiatives, and inspire volunteer participation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}