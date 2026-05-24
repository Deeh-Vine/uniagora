"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Handshake, Star } from "lucide-react";

const SPLASH_MESSAGES = [
  "Where students trade trusted.",
  "Your campus. Your marketplace.",
  "Buy. Sell. Connect. Safely.",
  "Built for students, by students."
];

export default function UniAgoraLandingPage() {
  const [splashIndex, setSplashIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  // Control the splash screen sequence
  useEffect(() => {
    if (splashIndex < SPLASH_MESSAGES.length) {
      const timer = setTimeout(() => {
        setSplashIndex((prev) => prev + 1);
      }, 1000); // Wait 1 second before showing the next message
      return () => clearTimeout(timer);
    } else {
      // After all messages, animate splash layout upward and remove it
      const endTimer = setTimeout(() => {
        setShowSplash(false);
      }, 500); 
      return () => clearTimeout(endTimer);
    }
  }, [splashIndex]);

  return (
    <div className="relative min-h-screen bg-[#e2e8f0] font-sans selection:bg-unilorin-gold selection:text-unilorin-blue">
      {/* Intro Splash Animation */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-screen"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-[#001122]"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {splashIndex < SPLASH_MESSAGES.length && (
                <motion.h1
                  key={splashIndex}
                  className="text-2xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {SPLASH_MESSAGES[splashIndex]}
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Landing Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col min-h-screen"
      >
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="mx-auto flex h-16 max-w-7xl justify-between items-center px-4 md:px-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-unilorin-blue tracking-tight">
                UniAgora
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-unilorin-blue font-medium hover:bg-gray-100 hidden sm:inline-flex">
                Log In
              </Button>
              <Button className="bg-unilorin-blue text-white hover:bg-unilorin-blue/90 shadow-md">
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 w-full mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showSplash ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-unilorin-blue mt-6 leading-tight tracking-tight">
              The Campus Marketplace You Can Actually Trust
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
              Buy, sell and exchange with verified students on your campus. 
              No scams. No strangers. Just your community.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="bg-unilorin-gold text-unilorin-blue hover:bg-unilorin-gold/80 hover:scale-105 transition-transform text-lg px-8 py-6 font-bold shadow-lg rounded-xl">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-unilorin-blue border-unilorin-blue/20 hover:bg-unilorin-blue/5 text-lg px-8 py-6 font-medium rounded-xl">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Features Section */}
          <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-md transition-shadow"
            >
              <div className="bg-unilorin-blue/10 p-4 rounded-full mb-6">
                <ShieldCheck className="w-8 h-8 text-unilorin-blue" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-unilorin-blue mb-3">
                Verified Students Only
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform ensures a secure environment where only university email holders can join and participate in the marketplace.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-md transition-shadow"
            >
              <div className="bg-unilorin-gold/20 p-4 rounded-full mb-6">
                <Handshake className="w-8 h-8 text-unilorin-blue" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-unilorin-blue mb-3">
                Handshake Transactions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Take the generic out of exchanges. A unique code confirms every real exchange in person to prevent false claims.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-md transition-shadow"
            >
              <div className="bg-unilorin-blue/10 p-4 rounded-full mb-6">
                <Star className="w-8 h-8 text-unilorin-blue" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-unilorin-blue mb-3">
                Honest Reviews
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Reputations are built on truth. Ratings only unlock after a confirmed valid transaction, ensuring fake reviews are impossible.
              </p>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between">
            <span className="text-unilorin-blue font-bold text-lg mb-4 md:mb-0">
              UniAgora
            </span>
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} UniAgora. Built by students, for students.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
