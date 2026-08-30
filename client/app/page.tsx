"use client";
import { Button, Input, Label, ListBox, Select } from "@heroui/react";
import TableHome, { RowsProps } from "./components/dashboard/table";
import { useAuth } from "./utils/auth_provider";
import { Plus } from "lucide-react";
import { ModalAddShedule, PropsObj } from "./components/dashboard/ModalAddShedule";
import { useEffect, useState } from "react";
import { api } from "./lib/axiosInstance";
import { DrawerScheduling } from "./components/dashboard/drawer";
import DeleteModal from "./components/ModalDeleteDefault";
import Metrics from "./components/dashboard/Metrics";
import FiltersScheduling from './components/Filters'

export interface UserAuth {
  name: string | null,
  role: string | null
}

interface ModalProps {
  open: boolean,
  type: string | null
  data: PropsObj | null
}

export default function Home() {

  //  ============= ESTADOS ===========
  const { user, isAdmin }: UserAuth | any = useAuth()
  const [modal, setModal] = useState<ModalProps>({ open: false, type: '', data: null })
  const [rows, setRows] = useState<RowsProps[]>([])
  const [filter, setFilter] = useState({ all: '', date: '', status: '', priority: '' })
  // ========= FUNÇÕES ==============

  async function saveShedule(values: PropsObj) {
    try {
      const responseSave = await api.post(`/saveScheduling`, values)
      if (responseSave.status === 200) {
        setModal({ open: false, type: '', data: null })
        getSchedule()
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao criar agendamento: ${error?.message}`)
    }
  }

  async function getSchedule() {
    try {
      const responseSave = await api.get(`/getScheduling`)
      if (responseSave.status === 200) {
        setRows(responseSave.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar agendamento: ${error?.message}`)
    }
  }

  async function onConfirmDelete() {
    try {
      const responseSave = await api.delete(`/delete?id=${modal.data?.id}`)
      if (responseSave.status === 200) {
        getSchedule()
      }
    } catch (error) {
      console.log(`Erro ao exluir atendimento`)
    }
  }

  function onFilter(value: string) {
    console.log(value)
  }
  const priorityFilter = rows?.map(i => i.priority)
  const statuFilter = rows?.map(i => i.status)

  // ============ HOOKS ==========

  useEffect(() => {
    getSchedule()
  }, [])

  return (
    <div className="w-[90%] mx-auto">
      <div className="px-4 rounded-2xl h-50 bg-[#0d2e4d]">
        <div className="pt-8">
          <h1 className="text-white font-bold">Olá {user?.name} !</h1>
          <h1 className="text-white">Bem-Vindo ao <b>Help Desk</b> Bold Energy</h1>
          <h1>{user?.role}</h1>
        </div>
      </div>
      <Metrics values={rows} />
      <FiltersScheduling priorityFilter={priorityFilter} statusFilter={statuFilter} onFilter={(value) => console.log(value)} filterState={filter} />
      <div className="flex justify-end my-3">
        {['administrador', 'cliente'].includes(user?.role) && (
          <Button onPress={() => setModal({ open: true, type: 'new', data: null })}>
            <Plus /> Novo Chamado
          </Button>
        )}
      </div>
      <TableHome
        rows={rows}
        onView={(data) => setModal({ open: true, type: 'details', data: data })}
        onDelete={(value) => setModal({ open: true, type: 'delete', data: value })}
      />
      <ModalAddShedule
        open={modal.open && modal.type === 'new'}
        onClose={() => setModal({ open: false, type: '', data: null })}
        onSave={(values) => saveShedule(values)}
      />
      <DrawerScheduling
        data={modal.data}
        open={modal.open && modal.type === 'details'}
        onClose={() => setModal({ open: false, type: '', data: null })}
      />
      <DeleteModal
        onDelete={() => onConfirmDelete()}
        title="Excluir agendamento?"
        open={modal.open && modal.type === 'delete'}
        text="Deseja excluir o agendamento solicitado?"
        onClose={() => setModal({ open: false, type: '', data: null })}
      />
    </div>
  );
}
