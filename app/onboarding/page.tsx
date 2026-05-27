"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FACULTIES = [
  "Faculty of Engineering & Technology",
  "Faculty of Science",
  "Faculty of Arts",
  "Faculty of Social Sciences",
  "Faculty of Education",
  "Faculty of Law",
  "Faculty of Agriculture",
  "Faculty of Business & Social Sciences",
  "Faculty of Communication & Information Sciences",
  "Faculty of Life Sciences",
  "Faculty of Pharmaceutical Sciences",
  "Faculty of Veterinary Medicine",
  "College of Health Sciences",
];

const LEVELS = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "600 Level",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    faculty: "",
    department: "",
    level: "",
    whatsapp: "",
  });

  // Errors State
  const [errors, setErrors] = useState({
    faculty: "",
    department: "",
    level: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      faculty: "",
      department: "",
      level: "",
    };

    if (!formData.faculty) {
      newErrors.faculty = "Faculty is required";
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
      isValid = false;
    }

    if (!formData.level) {
      newErrors.level = "Level is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Example transition
    setIsLoading(false);
    router.push("/dashboard");
  };

  const handleSkip = () => {
    // Allows user to skip if they don't want to provide anything right now
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#e2e8f0] flex flex-col items-center justify-center p-4 selection:bg-[#FFD700] selection:text-[#0005AA] font-sans py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Blue Header Section */}
        <div className="bg-[#0005AA] py-10 px-8 text-center border-b border-[#0005AA]/10">
          <p className="text-[#FFD700] text-sm font-bold tracking-widest uppercase mb-4">
            Step 2 of 2
          </p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Almost there!
          </h1>
          <p className="text-[#AACCFF] mt-2 font-medium">
            Help us personalize your marketplace experience
          </p>
        </div>

        <div className="p-8 pt-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Faculty */}
            <div className="space-y-2">
              <Label htmlFor="faculty" className="text-sm font-semibold text-gray-700">Faculty</Label>
              <Select
                value={formData.faculty}
                onValueChange={(value) => handleSelectChange("faculty", value || "")}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full focus:ring-[#0005AA]">
                  <SelectValue placeholder="Select your faculty" />
                </SelectTrigger>
                <SelectContent>
                  {FACULTIES.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.faculty && <p className="text-sm text-red-500 mt-1 font-medium">{errors.faculty}</p>}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-semibold text-gray-700">Department</Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="e.g. Computer Science, Civil Engineering"
                className="w-full focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                value={formData.department}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.department && <p className="text-sm text-red-500 mt-1 font-medium">{errors.department}</p>}
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-semibold text-gray-700">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value || "")}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full focus:ring-[#0005AA]">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && <p className="text-sm text-red-500 mt-1 font-medium">{errors.level}</p>}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-semibold text-gray-700">
                WhatsApp Number <span className="font-normal text-gray-400 ml-1">(Optional)</span>
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="08012345678"
                className="w-full focus-visible:ring-[#0005AA] focus-visible:border-[#0005AA]"
                value={formData.whatsapp}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">Only shared with confirmed transaction partners.</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#0005AA] hover:bg-[#0005AA]/90 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </form>

          {/* Skip Link */}
          <div className="mt-8 text-center text-sm">
            <button
              onClick={handleSkip}
              className="font-semibold text-gray-500 hover:text-[#0005AA] hover:underline transition-colors focus:outline-none"
              disabled={isLoading}
            >
              Skip for now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
