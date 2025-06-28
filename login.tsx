'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield, FiActivity } from 'react-icons/fi';

type FormData = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LaboratoryAuthPortal() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'mfa'>('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock MFA requirement
      setViewMode('mfa');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      {/* Main card */}
      <div className="w-full max-w-md">
        {/* Laboratory branding */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center border border-neutral-200">
              <FiActivity className="text-3xl text-blue-600" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-neutral-800 mb-1"
          >
            BioLab Diagnostics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500"
          >
            Secure Laboratory Management System
          </motion.p>
        </div>

        {/* Auth card */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden"
        >
          {/* Status indicator */}
          <div className="h-1 bg-blue-500"></div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {viewMode === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  ref={formRef}
                >
                  <h2 className="text-xl font-semibold flex items-center justify-center text-neutral-800 mb-6">Sign in to your account</h2>
                  <p>Welcome back! Please enter your details.</p>
                  
                  {/* Username field */}
                  <div className="space-y-1">
                    <label htmlFor="username" className="text-sm font-medium text-neutral-700">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <FiUser />
                      </div>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="Enter your Username"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <FiLock />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="w-full pl-10 pr-10 py-2.5 text-sm border border-neutral-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="Enter your Password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                        className="w-4 h-4 border border-neutral-300 rounded focus:ring-blue-500 text-blue-600"
                      />
                      <span className="text-sm text-neutral-700">Remember this device</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-rose-600 bg-rose-50 p-2 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                      isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white font-medium transition-colors`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <span>Access Laboratory</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="mfa"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleMfaSubmit}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-semibold text-neutral-800 mb-6">Two-Factor Verification</h2>
                  
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <FiShield className="text-3xl text-blue-600" />
                    </div>
                    <p className="text-neutral-600 mb-6">
                      Enter the 6-digit verification code sent to your registered device
                    </p>
                  </div>

                  {/* MFA Code Input */}
                  <div className="space-y-2">
                    <label htmlFor="mfaCode" className="text-sm font-medium text-neutral-700">
                      Verification Code
                    </label>
                    <div className="flex space-x-3">
                      {[...Array(6)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-full aspect-square text-center text-lg border border-neutral-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          pattern="[0-9]"
                          inputMode="numeric"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-rose-600 bg-rose-50 p-2 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                        isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                      } text-white font-medium transition-colors`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <span>Verify Identity</span>
                      )}
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('login')}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ← Back to login
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 text-center">
            <p className="text-xs text-neutral-500">
              Brain Waves • v4.2.1 • © {new Date().getFullYear()} BioLab Diagnostics
            </p>
          </div>
        </motion.div>

        {/* Support link */}
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Need help accessing your account?
          </a>
        </div>
      </div>
    </div>
  );
}