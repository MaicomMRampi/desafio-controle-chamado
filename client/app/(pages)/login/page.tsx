"use client"

// componentes do hero ui

import { Avatar, Button, Input, Label } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

// importações do projeto
import { api } from "@/app/lib/axiosInstance"
import { showErrorToast, showSuccessToast } from "@/app/components/toastDefault"

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ defaultValues: { email: "", password: "", }, })
  const router = useRouter()

  async function onSubmitForm(data: FormData) {
    try {
      const response = await api.post("/login", data)
      if (response.status === 200) {
        showSuccessToast(response?.data?.message)
        router.push('/')
      }
    } catch (error: undefined | any) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao fazer login', ${error?.response?.data?.message}`)
    }
  }

  return (
    <div className="grid grid-cols-12 min-h-screen w-full">
      <div className="hidden md:block md:col-span-8 w-full h-full overflow-hidden">
        <img
          src="/images/callendar.png"
          alt="Ilustração do Calendário"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-4 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit((data) => onSubmitForm(data))}
          className="flex flex-col gap-5 w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
        >
          <h2 className="text-2xl font-bold text-slate-800">Bem-vindo de volta 👋</h2>
          <p className="text-sm text-slate-500 -mt-3">Acesse sua conta para continuar.</p>
          <div className="w-full">
            <Label>E-mail</Label>
            <Input className="h-10" fullWidth {...register('email', { required: 'Email é obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })} placeholder="Digite seu email" />
          </div>

          {/* ========= ERROS RELACIONADOS AO EMAIL ==========*/}
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <div>
            <Label>Senha</Label>
            <Input type="password" className="h-10" fullWidth {...register('password', { required: 'Senha é obrigatória' })} placeholder="Digite sua senha" />
          </div>
          {/* ========== ERROS RELACIONADO A SENHA ================= */}
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <Button fullWidth type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  )
}
