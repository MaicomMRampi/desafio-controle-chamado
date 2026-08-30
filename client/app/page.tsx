"use client";
import { Button } from "@heroui/react";
import TableHome from "./components/dashboard/table";
import { useAuth } from "./utils/auth_provider";
import { Plus } from "lucide-react";
import { ModalAddShedule, PropsObj } from "./components/dashboard/ModalAddShedule";
import { useState } from "react";
import { api } from "./lib/axiosInstance";

interface UserAuth {
  name: string | null,
  role: string | null
}

export default function Home() {
  const { user }: UserAuth | any = useAuth()
  const [modal, setModal] = useState({ open: false })

  async function saveShedule(values: PropsObj) {
    try {
      const responseSave = await api.post(`/saveScheduling`, values)
      if (responseSave.status === 200) {
        setModal({ open: false })
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao criar agendamento: ${error?.message}`)
    }
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="px-4 rounded-2xl h-50 bg-[#0d2e4d]">
        <div className="pt-8">
          <h1 className="text-white font-bold">Olá {user?.name} !</h1>
          <h1 className="text-white">Bem-Vindo ao <b>Help Desk</b> Bold Energy</h1>
          <h1>{user?.role}</h1>
        </div>
      </div>
      <div>
        filtros
      </div>
      <div>
        <div className="flex justify-end my-3">
          <Button onPress={() => setModal({ open: true })}>
            <Plus /> Novo Chamado</Button>
        </div>
        <TableHome />
      </div>
      <ModalAddShedule open={modal.open} onClose={() => setModal({ open: false })} onSave={(values) => saveShedule(values)} />
    </div>
  );
}
