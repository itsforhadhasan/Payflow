"use client";

import { AUTH_LOGIN } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { UserTypes } from "@/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Consumer);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await AUTH_LOGIN(userType, email, password);

      if (response.success) {
        router.push("/dashboard");
      } else {
        setError(response.error || "An error occurred");
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center h-full py-12">
      <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </div>
      </form>
    </div>
  );
}
