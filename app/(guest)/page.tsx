"use client";

import { AUTH_LOGIN } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { UserTypes } from "@/types";
import Link from "next/link";
import { UserPlus, Briefcase } from "lucide-react";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Consumer);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await AUTH_LOGIN(userType, identifier, password);

      if (response.success) {
        router.push("/dashboard");
      } else {
        setError(response.error || "An error occurred");
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center h-full py-12 px-4">
      <form className="mx-auto grid w-[400px] gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your credentials to login to your account
          </p>
        </div>
        <Tabs value={userType} onValueChange={(value) => setUserType(value as UserTypes)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={UserTypes.Consumer}>Consumer</TabsTrigger>
            <TabsTrigger value={UserTypes.Agent}>Agent</TabsTrigger>
            <TabsTrigger value={UserTypes.Admin}>Admin</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid gap-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="identifier">
              {userType === UserTypes.Admin ? "Email" : "Email or Phone"}
            </Label>
            <Input
              id="identifier"
              type="text"
              placeholder={userType === UserTypes.Admin ? "admin@example.com" : "email@example.com or 01712345678"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link href="/register/consumer">
              <Button variant="outline" className="w-full" type="button">
                <UserPlus className="mr-2 h-4 w-4" />
                Join as New Consumer
              </Button>
            </Link>
            <Link href="/register/agent">
              <Button variant="outline" className="w-full" type="button">
                <Briefcase className="mr-2 h-4 w-4" />
                Join as New Agent
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
