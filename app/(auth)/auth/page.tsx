'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { loginSchema, registerSchema } from '../../../lib/validationSchema';
import { loginAction, registerAction } from '@/actions/AuthAction';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import Logo from '@/components/Logo'; // Import the logo component

const AuthComponent = () => {
  const router = useRouter();
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginClientError, setLoginClientError] = useState("");
  const [loginServerError, setLoginServerError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupClientError, setSignupClientError] = useState("");
  const [signupServerError, setSignupServerError] = useState("");
  const [signupServerSuccess, setSignupServerSuccess] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginClientError("");
    setLoginServerError("");

    const validation = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!validation.success) {
      return setLoginClientError(validation.error.errors[0].message);
    }

    setLoginLoading(true);
    try {
      const result = await loginAction({ email: loginEmail, password: loginPassword });
      if (result?.success) {
        console.log("User logged in successfully", result.success);
        router.push('/dashboard');
      } else {
        setLoginServerError(result.message);
      }
    } catch (error) {
      setLoginServerError("An unexpected error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSignupClientError("");
    setSignupServerError("");

    const validation = registerSchema.safeParse({
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    });
    
    if (!validation.success) {
      return setSignupClientError(validation.error.errors[0].message);
    }

    setSignupLoading(true);
    try {
      const result = await registerAction({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      
      if (result?.error) {
        setSignupServerError(result.error);
      }
      
      if (result?.success) {
        setSignupServerSuccess(result.success);
        console.log("User registered successfully", result.success);
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (error) {
      setSignupServerError("An unexpected error occurred");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Animated Logo */}
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="text-center mb-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-[#272666]">Welcome to TICK-hub</h1>
        <p className="text-sm text-gray-600 mt-1">Your new ticketing system</p>
      </motion.div>

      {/* Auth Tabs */}
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg  mb-5">
          <TabsTrigger
            value="signin"
            className="rounded-md  text-sm font-medium data-[state=active]:bg-[#272666] data-[state=active]:text-white transition-all"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="rounded-md  text-sm font-medium data-[state=active]:bg-[#272666] data-[state=active]:text-white transition-all"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="signin" asChild>
            <motion.div
              key="signin-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer border border-gray-200 w-full hover:bg-gray-50 transition-colors group"
                >
                  <FcGoogle size={20} />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative px-3 bg-white text-xs text-gray-500">
                    or login with email
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={loginLoading}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#272666] focus:ring-1 focus:ring-[#272666] p-2.5 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
                    <a href="#" className="text-xs text-[#272666] hover:text-[#3a3990] hover:underline transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={loginLoading}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#272666] focus:ring-1 focus:ring-[#272666] p-2.5 text-sm"
                    placeholder="••••••••••••••"
                  />
                </div>

                {(loginClientError || loginServerError) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert type="error" message={loginClientError || loginServerError} />
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loginLoading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 disabled:bg-purple-300 bg-[#272666] text-white rounded-lg py-2.5 px-4 hover:bg-[#3a3990] transition-colors font-medium text-sm"
                >
                  {loginLoading ? <Spinner /> : "Login"}
                </motion.button>
              </form>
            </motion.div>
          </TabsContent>

          <TabsContent value="signup" asChild>
            <motion.div
              key="signup-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="username" className="block text-xs font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                    disabled={signupLoading}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#272666] focus:ring-1 focus:ring-[#272666] p-2.5 text-sm"
                    placeholder="Username"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="signup-email" className="block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={signupLoading}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#272666] focus:ring-1 focus:ring-[#272666] p-2.5 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="signup-password" className="block text-xs font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    disabled={signupLoading}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#272666] focus:ring-1 focus:ring-[#272666] p-2.5 text-sm"
                    placeholder="••••••••••••••"
                  />
                </div>

                {(signupClientError || signupServerError) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert type="error" message={signupClientError || signupServerError} />
                  </motion.div>
                )}
                
                {signupServerSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert type="success" message={signupServerSuccess} />
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={signupLoading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 disabled:bg-purple-300 bg-[#272666] text-white rounded-lg py-2.5 px-4 hover:bg-[#3a3990] transition-colors font-medium text-sm"
                >
                  {signupLoading ? <Spinner /> : "Create Account"}
                </motion.button>
              </form>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default AuthComponent;