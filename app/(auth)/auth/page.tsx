'use client';
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from '../../../lib/validationSchema';
import { registerSchema } from '../../../lib/validationSchema';

import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
// import { loginAction } from '@/actions/AuthAction';
import { registerAction } from '@/actions/AuthAction';

const AuthComponent = () => {
  // const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginClientError("");
    setLoginServerError("");

    const validation = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!validation.success) {
      return setLoginClientError(validation.error.errors[0].message);
    }

    setLoginLoading(true);
    // try {
    //   const result = await loginAction({ email: loginEmail, password: loginPassword });
    //   // if (result?.success) {
    //   //   router.push('/dashboard'); // Redirect to dashboard on success
    //   // } else {
    //   //   setLoginServerError(result.message);
    //   // }
    // } finally {
    //   setLoginLoading(false);
    // }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        // router.push("/dashboard");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0 ">
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">Glad to see you again 👋</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Login or Register if you don&apos;t have an Account</p>
      </div>

      <div className="w-full ">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 h-full ">
            <TabsTrigger
              value="signin"
              className="rounded-md py-2.5 px-4 text-sm sm:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-md py-2.5 px-4 text-sm sm:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all"
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
                className="space-y-5"
              >
                <form onSubmit={handleSubmit} className="">
                  <button
                    type="button"
                    onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 mb-3 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm w-full hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                  >
                    <FcGoogle size={24} />
                    <span className="text-sm sm:text-base font-medium">Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative px-4 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
                      or
                    </div>
                  </div>

                  <div className="space-y-1  mb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={loginLoading}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2.5 sm:p-3 dark:bg-gray-800 dark:text-white"
                      placeholder="someone@example.com"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                      <a href="#" className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={loginLoading}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2.5 sm:p-3 dark:bg-gray-800 dark:text-white"
                      placeholder="••••••••••••••"
                    />
                  </div>

                  {(loginClientError || loginServerError) && (
                    <Alert type="error" message={loginClientError || loginServerError} />
                  )}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full mt-6 disabled:bg-blue-300 dark:disabled:bg-blue-800 bg-blue-600 dark:bg-blue-500 text-white rounded-lg py-2.5 sm:py-3 px-4 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm sm:text-base shadow-sm"
                  >
                    {loginLoading ? <Spinner /> : "Login"}
                  </button>
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2.5 sm:p-3 dark:bg-gray-800 dark:text-white"
                      placeholder="Username"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2.5 sm:p-3 dark:bg-gray-800 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                      type="password"
                      id="signup-password"
                      name="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2.5 sm:p-3 dark:bg-gray-800 dark:text-white"
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
                    className="w-full mt-6 disabled:bg-blue-300 dark:disabled:bg-blue-800 bg-blue-600 dark:bg-blue-500 text-white rounded-lg py-2.5 sm:py-3 px-4 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm sm:text-base shadow-sm"
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