"use client";

import { useAuth } from "@/app/utils/auth_provider";
import { UserAuth } from "@/app/page";
import { Button, Input, Chip, TextField, Label } from "@heroui/react";
import { Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { api } from "@/app/lib/axiosInstance";
import { showSuccessToast, showErrorToast } from "@/app/components/toastDefault";

interface PropsForm {
  name?: string,
  email: string,
  oldPassword?: string,
  newPassword?: string,
  newConfirmPasword: string
}

const defaultValuesUser = { name: '', email: '', oldPassword: '', newPassword: '', newConfirmPasword: '' }

export default function Profile() {
  const { user }: UserAuth | any = useAuth();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<PropsForm>({ defaultValues: defaultValuesUser })

  async function updateUser(values: any) {
    try {
      const response = await api.put('/updateProfile', values)
      showSuccessToast(response?.data?.message)
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao atualizar usuario: ${error?.response?.data?.message}`)
    }
  }

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex justify-center items-center p-8 text-slate-500 text-sm">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Meu Perfil</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie suas informações pessoais e credenciais de acesso
          </p>
        </div>
        <Chip>{user.role}</Chip>
      </div>
      <form onSubmit={handleSubmit(updateUser)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Informações Gerais
          </h2>
          <Controller
            name="name"
            control={control}
            rules={{ required: "O nome é obrigatório" }}
            render={({ field }) => (
              <TextField className="w-full" variant="secondary">
                <Label>Nome</Label>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Digite seu nome"
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </span>
                )}
              </TextField>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "O email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            }}
            render={({ field }) => (
              <TextField className="w-full" variant="secondary">
                <Label>Email</Label>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </TextField>
            )}
          />
        </div>
        <hr className="border-slate-100" />
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Alterar Senha
          </h2>
          <div className="flex flex-col gap-1.5">
            <Controller
              name="oldPassword"
              control={control}
              rules={{ required: "A senha atual é obrigatória" }}
              render={({ field }) => (
                <TextField className="w-full" variant="secondary">
                  <Label>Senha atual</Label>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Digite a senha sua senha"
                  />
                  {errors.oldPassword && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.oldPassword.message}
                    </span>
                  )}
                </TextField>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: "A nova senha é obrigatória" }}
                render={({ field }) => (
                  <TextField className="w-full" variant="secondary">
                    <Label>Nova Senha</Label>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Digite a nova senha"
                    />
                    {errors.newPassword && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.newPassword.message}
                      </span>
                    )}
                  </TextField>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Controller
                name="newConfirmPasword"
                control={control}
                rules={{ required: "A confirmação é obrigatória" }}
                render={({ field }) => (
                  <TextField className="w-full" variant="secondary">
                    <Label>Confirmar Nova Senha</Label>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Digite a nova senha"
                    />
                    {errors.newConfirmPasword && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.newConfirmPasword.message}
                      </span>
                    )}
                  </TextField>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6">
            <Save className="size-4" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}