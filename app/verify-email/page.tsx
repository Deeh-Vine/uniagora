"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [countdown, setCountdown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Hardcoded for UI demonstration
  const userEmail = "john.doe@students.unilorin.edu.ng";

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle success message visibility
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleResend = () => {
    setCountdown(60);
    setShowSuccess(true);
    // Add real resend logic here in the future
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
          </div>

          <div className="p-8 pt-10 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="bg-[#AACCFF]/20 p-5 rounded-full mb-6">
              <MailOpen
                className="w-12 h-12 text-[#0005AA]"
                strokeWidth={1.5}
              />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check your inbox
            </h2>

            <p className="text-gray-600 font-medium mb-1 text-sm md:text-base">
              We sent a verification link to
            </p>

            {/* Email Address */}
            <p className="text-[#0005AA] font-bold text-lg mb-4 break-all">
              {userEmail}
            </p>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-sm">
              Click the link in the email to verify your account and access the
              marketplace.
            </p>

            {/* Success Message Area - reserved space to prevent layout shifts */}
            <div className="h-6 mb-4 w-full flex justify-center items-center">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-md"
                  >
                    Email resent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resend Button */}
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={countdown > 0}
              className="w-full border-2 border-[#0005AA]/20 text-[#0005AA] hover:bg-[#0005AA]/5 hover:border-[#0005AA]/40 font-semibold py-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend Email"}
            </Button>

            {/* Go Back Link */}
            <div className="mt-8 text-center text-sm">
              <Link
                href="/signup"
                className="font-semibold text-gray-500 hover:text-[#0005AA] hover:underline transition-colors"
              >
                Wrong email? Go back
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
