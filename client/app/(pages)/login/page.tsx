"use client";

import { api } from "@/app/lib/axiosInstance";
import { Avatar, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {

  const { register, handleSubmit, watch, formState: { errors }, } = useForm({ defaultValues: { email: "", password: "", }, });

  // ============= FUNÇÕES ============ 

  async function onSubmitForm(data: FormData) {
    try {
      const response = await api.post("/login", data)
      console.log("🚀 ~ onSubmitForm ~ response:", response)
    } catch (error: undefined | any) {
      console.log("🚀 ~ onSubmitForm ~ error:", error.response)
      console.log('Erro ao fazer login', error?.message || error);
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-[#016a94f5]">
      <div className="col-span-12 md:col-span-8 bg-center sx:hidden" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}>
        <img src={`../images/5.jpg`} alt="1" className={`w-full h-screen transition-opacity duration-1000 ${false ? "opacity-100" : "opacity-0"}`} />
      </div>
      <form onSubmit={handleSubmit((data) => onSubmitForm(data))} className="w-[60%] h-full flex items-center justify-center col-span-12 md:col-span-4 flex-col gap-3">
        <Avatar size="lg">
          <Avatar.Image alt="Logo bold energy" src="../images/logo.png" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>

        <Input className="h-10" fullWidth {...register('email', { required: 'Email é obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })} placeholder="Digite seu email" />

        {/* ========= ERROS RELACIONADOS AO EMAIL ==========*/}
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <Input type="password" className="h-10" fullWidth {...register('password', { required: 'Senha é obrigatória' })} placeholder="Digite sua senha" />
        {/* ========== ERROS RELACIONADO A SENHA ================= */}
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        <Button fullWidth type="submit">Entrar</Button>
      </form>
    </div>
  );
}
