"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Errors State
  const [errors, setErrors] = useState({
    fullName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!formData.email.endsWith("@students.unilorin.edu.ng")) {
      newErrors.email = "Must be a valid @students.unilorin.edu.ng email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would proceed to Step 2 here
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#e2e8f0] flex flex-col items-center justify-center p-4 selection:bg-unilorin-gold selection:text-unilorin-blue font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Blue Header Section */}
        <div className="bg-[#001122] py-10 px-8 text-center border-b border-[#0005AA]/10">
          <Link href="/" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
            <h1 className="text-3xl font-extrabold text-unilorin-blue tracking-tight mb-2">
              Uni<span className="text-unilorin-light-blue">Agora</span>            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mt-4">Create your account</h2>
          <p className="text-[#AACCFF] mt-2 font-medium">Join your campus marketplace</p>
        </div>

        <div className="p-8 pt-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm font-semibold text-gray-700">Display Name</Label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                placeholder="johndoe123"
                className="w-full focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                value={formData.displayName}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">This is how others will see you.</p>
              {errors.displayName && <p className="text-sm text-red-500 mt-1">{errors.displayName}</p>}
            </div>

            {/* University Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">University Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@students.unilorin.edu.ng"
                className="w-full border-l-2 border-l-[#FFD700] focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">Use your Unilorin student email.</p>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
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
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-10 focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-unilorin-blue hover:bg-unilorin-blue/90 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-unilorin-blue hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
