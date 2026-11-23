"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
            src="/favicon.png"
            alt="Sweet Crumbs Logo"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-2xl font-bold text-[#111827]">Sweet Crumbs</h1>
          <p className="text-sm text-[#6B7280]">Login to open Dashboard</p>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-[#111827]">
          Email
          <input
            {...register("email")}
            type="email"
            placeholder="abc@gmail.com"
            className="py-2 px-3 border border-[#E5E7EB] rounded-lg outline-none focus:border-[#C2416C]"
          />
        </label>
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

        <label className="flex flex-col gap-1 text-sm font-medium text-[#111827]">
          Password
          <input
            {...register("password")}
            type="password"
            className="py-2 px-3 border border-[#E5E7EB] rounded-lg outline-none focus:border-[#C2416C]"
          />
        </label>
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

        <button
          type="submit"
          className="mt-2 py-2 rounded-lg bg-[#C2416C] text-white font-medium cursor-pointer hover:bg-[#A8345B]"
        >
          Login
        </button>
      </form>
    </div>
  );
}