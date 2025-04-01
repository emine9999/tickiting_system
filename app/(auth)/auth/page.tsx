'use client';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from '../../../lib/validationSchema';
import { registerSchema } from '../../../lib/validationSchema';

import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { loginAction } from '@/actions/AuthAction';
import { registerAction } from '@/actions/AuthAction';

const AuthComponent = () => {
  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginClientError, setLoginClientError] = useState("");
  const [loginServerError, setLoginServerError] = useState("");
  const [loginServerSuccess, setLoginServerSuccess] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupClientError, setSignupClientError] = useState("");
  const [signupServerError, setSignupServerError] = useState("");
  const [signupServerSuccess, setSignupServerSuccess] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!validation.success) {
      return setLoginClientError(validation.error.errors[0].message);
    }

    setLoginLoading(true);
    try {
      const result = await loginAction({ email: loginEmail, password: loginPassword });
      if (result?.error) setLoginServerError(result.error);
      if (result?.success) {
        setLoginServerSuccess(result.success);
        setLoginEmail("");
        setLoginPassword("");
        setLoginClientError("");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      if (result?.error) setSignupServerError(result.error);
      if (result?.success) {
        setSignupServerSuccess(result.success);
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupClientError("");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back!</h1>
        <p className="text-sm text-gray-500 mt-2">Glad to see you again 👋</p>
        <p className="text-sm text-gray-500">Login or Register if you don't have an Account</p>
      </div>

      <div className="w-full py-2">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1 h-full">
            <TabsTrigger
              value="signin"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="signin" asChild>
              <motion.div
                key="signin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>
                  <div>
                    <button
                      type="button"
                      onClick={() => signIn("google")}
                      className="flex items-center justify-center gap-2 px-2 py-2 mb-3 rounded-md cursor-pointer border-gray-200 border shadow-sm w-full hover:shadow-lg"
                    >
                      <FcGoogle size={32} />
                      <span>Continue with Google</span>
                    </button>

                    <p className="text-gray-500 text-center text-xl">or</p>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                      placeholder="someone@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                      placeholder="••••••••••••••"
                    />
                  </div>

                  {(loginClientError || loginServerError) && (
                    <Alert type="error" message={loginClientError || loginServerError} />
                  )}
                  {loginServerSuccess && <Alert type="success" message={loginServerSuccess} />}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full disabled:bg-blue-300 bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-[#4861DD] transition-colors"
                  >
                    {loginLoading ? <Spinner /> : "Login"}
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Forgot your password?{' '}
                  <Link href="/auth/reset" className="text-[#49176D] hover:underline">
                    Recover your account access now
                  </Link>
                </p>
              </motion.div>
            </TabsContent>

            <TabsContent value="signup" asChild>
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleRegister} className="space-y-4 mt-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      id="signup-password"
                      name="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3"
                      placeholder="••••••••••••••"
                    />
                  </div>

                  {(signupClientError || signupServerError) && (
                    <Alert type="error" message={signupClientError || signupServerError} />
                  )}
                  {signupServerSuccess && <Alert type="success" message={signupServerSuccess} />}

                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full disabled:bg-blue-300 bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-[#4861DD] transition-colors"
                  >
                    {signupLoading ? <Spinner /> : "Sign Up"}
                  </button>
                </form>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthComponent;