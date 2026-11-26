"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormFields } from "@/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormFields) => {
    login(data.email);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#111214] px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md bg-white dark:bg-[#1C1D21] border border-gray-200 dark:border-[#2A2B30] rounded-2xl p-12 flex flex-col gap-5"
      >
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            alt="Sweet Crumbs logo"
            width={64}
            height={64}
          />
          <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F4F4F5]">
            Sweet Crumbs
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Login to dashboard</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-[#111827] dark:text-[#F4F4F5]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="abc@gmail.com"
            {...register("email")}
            className="h-10 border border-gray-300 dark:border-[#2A2B30] text-[#111827] dark:text-[#F4F4F5]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-[#111827] dark:text-[#F4F4F5]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••"
            {...register("password")}
            className="h-10 border border-gray-300 dark:border-[#2A2B30] text-[#111827] dark:text-[#F4F4F5]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="h-10 w-full cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
}
