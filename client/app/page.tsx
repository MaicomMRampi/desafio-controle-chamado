"use client";
import { Button, Input, Label, ListBox, Select } from "@heroui/react";
import TableHome, { RowsProps } from "./components/dashboard/table";
import { useAuth } from "./utils/auth_provider";
import { Plus } from "lucide-react";
import { ModalAddShedule, PropsObj } from "./components/dashboard/ModalAddShedule";
import { useEffect, useMemo, useState } from "react";
import { api } from "./lib/axiosInstance";
import { DrawerScheduling } from "./components/dashboard/drawer";
import DeleteModal from "./components/ModalDeleteDefault";
import Metrics from "./components/dashboard/Metrics";
import FiltersScheduling from './components/dashboard/Filters'
import { ModalFirstLogin } from "./components/ModalFirstLogin";
import { showErrorToast, showSuccessToast } from "./components/toastDefault";

export interface UserAuth {
  name: string | null,
  role: string | null
}

interface ModalProps {
  open: boolean,
  type: string | null
  data: PropsObj | null
}

const initialValues = { all: '', date: '', status: '', priority: '' }

export default function Home() {

  //  ============= ESTADOS ===========
  const { user, isAdmin, firstLogin }: UserAuth | any = useAuth()
  const [modal, setModal] = useState<ModalProps>({ open: false, type: '', data: null })
  const [rows, setRows] = useState<RowsProps[]>([])
  const [filter, setFilter] = useState(initialValues)

  const priorityFilter = [...new Set(rows?.map(i => i.priority))];
  const statuFilter = [...new Set(rows?.map(i => i.status))];

  // ========= FUNÇÕES ==============

  async function saveShedule(values: PropsObj) {
    try {
      let responseSave = null
      if (values?.id) {
        responseSave = await api.put(`/editScheduling`, values)
      } else {
        responseSave = await api.post(`/saveScheduling`, values)
      }
      if (responseSave.status === 200) {
        showSuccessToast(responseSave?.data?.message)
        setModal({ open: false, type: '', data: null })
        getSchedule()
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao criar agendamento: ${error?.response?.data?.message}`)
    }
  }

  async function getSchedule() {
    try {
      const responseSave = await api.get(`/getScheduling`)
      if (responseSave.status === 200) {
        setRows(responseSave.data)
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao buscar agendamento: ${error?.response?.data?.message}`)
    }
  }

  async function onConfirmDelete() {
    try {
      const responseDelete = await api.delete(`/delete?id=${modal.data?.id}`)
      if (responseDelete.status === 200) {
        setModal({ open: false, data: null, type: '' })
        showSuccessToast(responseDelete?.data?.message)
        getSchedule()
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao exluir atendimento ${error?.response?.data?.message}`)
    }
  }

  async function updateStatus(process: string) {
    try {
      console.log(process)
    } catch (error) {

    }
  }
  // ================================
  function onChangeFilter(key: string, value: string) {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const filteredRows = useMemo(() => {
    if (!rows) return []
    return rows.filter((item) => {
      const searchAll = filter.all?.toLocaleLowerCase().trim()
      const searc = !searchAll ||
        item.title?.toLocaleLowerCase().includes(searchAll) ||
        item.client?.toLocaleLowerCase().includes(searchAll) ||
        item.description?.toLocaleLowerCase().includes(searchAll) ||
        String(item.id).includes(searchAll)

      const date = !filter.date || item.openingDate.startsWith(filter.date)
      const status = !filter.status || item.status.includes(filter.status)
      const classification = !filter.priority || item.priority.includes(filter.priority)

      return searc && date && status && classification
    })

  }, [filter, rows])
  // ============ HOOKS ==========

  useEffect(() => {
    if (user?.firstLogin) {
      setModal({ open: true, type: 'login', data: null })
    } else {
      setModal({ open: false, data: null, type: '' })
    }
  }, [firstLogin])

  useEffect(() => {
    getSchedule()
  }, [])

  return (
    <div className="w-[90%] mx-auto">
      <div className="px-4 rounded-2xl bg-[#0d2e4d] p-4">
        <div className="">
          <h1 className="text-white font-bold">Olá {user?.name} !</h1>
          <h1 className="text-white">Bem-Vindo ao <b>Help Desk</b> Bold Energy</h1>
          <h1>{user?.role}</h1>
        </div>
      </div>
      <Metrics
        values={rows}
      />
      <div className="py-3">
        <FiltersScheduling
          priorityFilter={priorityFilter}
          statusFilter={statuFilter}
          onFilter={(key, value) => onChangeFilter(key, value)}
          filterState={filter}
          onClear={() => setFilter(initialValues)}
        />
      </div>
      <div className="flex justify-end my-3">
        {['administrador', 'cliente'].includes(user?.role) && (
          <Button onPress={() => setModal({ open: true, type: 'new', data: null })}>
            <Plus /> Novo Chamado
          </Button>
        )}
      </div>
      <TableHome
        onEdit={(data) => setModal({ open: true, type: 'new', data: data })}
        rows={filteredRows}
        onView={(data) => setModal({ open: true, type: 'details', data: data })}
        onDelete={(value) => setModal({ open: true, type: 'delete', data: value })}
      />
      <ModalAddShedule
        open={modal.open && modal.type === 'new'}
        onClose={() => setModal({ open: false, type: '', data: null })}
        onSave={(values) => saveShedule(values)}
        valuesOnEdit={modal.data}
      />
      <DrawerScheduling
        data={modal.data}
        open={modal.open && modal.type === 'details'}
        onClose={() => setModal({ open: false, type: '', data: null })}
        onStatus={(value) => updateStatus(value)}
      />
      <DeleteModal
        onDelete={() => onConfirmDelete()}
        title="Excluir agendamento?"
        open={modal.open && modal.type === 'delete'}
        text="Deseja excluir o agendamento solicitado?"
        onClose={() => setModal({ open: false, type: '', data: null })}
      />
      <ModalFirstLogin
        open={modal.open && modal.type === 'login'}
        onClose={() => setModal({ open: false, data: null, type: '' })}
      />
    </div>
  );
}
