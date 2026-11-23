"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormFields } from "@/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";

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

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    login(data.email);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm bg-white border border-[#E5E7EB] rounded-xl p-8 flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <Image
            src="/logo.png"
            alt="Sweet Crumbs Logo"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-2xl font-bold text-[#111827]">Sweet Crumbs</h1>
          <p className="text-sm text-[#6B7280]">Login to dashboard</p>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="abc@gmail.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="mt-2 cursor-pointer hover:bg-[#A8345B]">
          Login
        </Button>
      </form>
    </div>
  );
}