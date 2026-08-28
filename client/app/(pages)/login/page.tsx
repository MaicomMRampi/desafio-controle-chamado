"use client";

import { api } from "@/app/lib/axiosInstance";
import { Avatar, Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  document: string;
  password: string;
}

const images = ["5.jpg", "2.jpg"];
export default function Login() {

  //  ======= ESTADOS DA APLICAÇÃO ========

  const [index, setIndex] = useState(0);
  console.log("🚀 ~ Login ~ index:", index)
  const [fade, setFade] = useState(true);
  const { register, handleSubmit, watch, formState: { errors }, } = useForm({ defaultValues: { document: "", password: "", }, });

  // ============= FUNÇÕES ============ 

  async function onSubmitForm(data: FormData) {
    try {
      const response = await api.post("/auth/login", data)
    } catch (error: undefined | any) {
      console.log('Erro ao fazer login', error?.message || error);
    }
  }

  // =========== HOOKS ============

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setFade(false);
  //     setTimeout(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % images.length);
  //     }, 500);
  //   }, 5000);

  //   return () =>
  //     clearInterval(timer);
  // }, [])

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-[#016a94f5]">
      <div className="col-span-12 md:col-span-8 bg-center sx:hidden" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}>
        <img src={`../images/5.jpg`} alt="1" className={`w-full h-screen transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`} />
      </div>
      <form onSubmit={handleSubmit((data) => onSubmitForm(data))} className="w-[60%] h-full flex items-center justify-center col-span-12 md:col-span-4 flex-col gap-3">
        <Avatar size="lg">
          <Avatar.Image alt="Logo bold energy" src="../images/logo.png" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Input className="h-10" fullWidth {...register('document', { required: true, minLength: 11, maxLength: 14 })} placeholder="Digite seu CPF/CNPJ" />

        {/* ========= ERROS RELACIONADOS AO DOCUMENTO ==========*/}
        {errors.document && <span className="text-red-500">Campo obrigatório</span>}
        {errors.document?.type === 'maxLength' && <span className="text-red-500">Máximo de 14 caracteres</span>}
        {errors.document?.type === 'minLength' && <span className="text-red-500">Minimo 11 caracteres</span>}
        <Input className="h-10" fullWidth {...register('password', { required: true })} placeholder="Digite sua senha" />

        {/* ========== ERROS RELACIONADO A SENHA ================= */}
        {errors.password && <span className="text-red-500">Campo obrigatório</span>}
        <Button fullWidth type="submit">Entrar</Button>
      </form>
    </div>
  );
}
