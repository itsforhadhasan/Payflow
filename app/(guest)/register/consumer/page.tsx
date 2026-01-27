"use client";

import { AUTH_REGISTER_CONSUMER } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConsumerRegister() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nidNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const { confirmPassword, ...registrationData } = formData;
      
      const response = await AUTH_REGISTER_CONSUMER({
        ...registrationData,
        dateOfBirth: registrationData.dateOfBirth || undefined,
        nidNumber: registrationData.nidNumber || undefined,
      });

      if (response.success) {
        setSuccess("Registration successful! You've received ৳50 welcome bonus. Redirecting to login...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(response.error || "Registration failed. Please try again.");
      }
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
        
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Join as Consumer</h1>
            <p className="text-balance text-muted-foreground">
              Create your account and get ৳50 welcome bonus
            </p>
          </div>

          <div className="grid gap-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {success}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01712345678"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                pattern="01[3-9][0-9]{8}"
                title="Please enter a valid Bangladeshi phone number (e.g., 01712345678)"
              />
              <p className="text-xs text-muted-foreground">
                Format: 01XXXXXXXXX (11 digits)
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nidNumber">NID Number</Label>
              <Input
                id="nidNumber"
                type="text"
                placeholder="1234567890"
                value={formData.nidNumber}
                onChange={(e) => handleChange("nidNumber", e.target.value)}
                minLength={10}
                maxLength={20}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                minLength={8}
                title="Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
              />
              <p className="text-xs text-muted-foreground">
                Min 8 characters, including uppercase, lowercase, number, and special character
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
                minLength={8}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || !!success}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/" className="font-medium text-primary hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

