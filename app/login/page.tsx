"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Errors State
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.trim() || !formData.password) {
      setError("Invalid email or password");
      return;
    }

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate a failure for demonstration or proceed otherwise
    // Replace with real logic
    setError("Invalid email or password");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#e2e8f0] flex flex-col p-4 selection:bg-[#FFD700] selection:text-[#0005AA] font-sans">
      <header className="flex items-center py-4 px-8 mb-8 -mx-4 -mt-4 bg-[#001122]">
        <div className="text-white text-3xl font-extrabold tracking-tight">
          Uni<span className="text-unilorin-light-blue">Agora</span>
        </div>
      </header>
      <div className="flex items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Blue Header Section */}
          <div className="bg-[#0005AA] py-10 px-8 text-center border-b border-[#0005AA]/10">
            <Link
              href="/"
              className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                UniAgora
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-white mt-4">Welcome back</h2>
            <p className="text-[#AACCFF] mt-2 font-medium">
              Log in to your campus marketplace
            </p>
          </div>

          <div className="p-8 pt-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* University Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  University Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@students.unilorin.edu.ng"
                  className="w-full focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-[#0005AA] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pr-10 focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-500 text-center mt-2 font-medium">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#0005AA] hover:bg-[#0005AA]/90 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging In...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#0005AA] hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
