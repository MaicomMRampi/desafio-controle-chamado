"use client";

import { api } from "@/app/lib/axiosInstance";
import { Button, Chip, Table } from "@heroui/react";
import { Trash, UserRoundX } from 'lucide-react';

import { useEffect, useState } from "react";
// components

import DeleteModal from "@/app/components/ModalDeleteDefault";
import NewStatus, { PropsModal } from "../ModalNewStatus";

interface PropsStateModal {
  open: boolean;
  data: any;
  type: 'edit' | 'delete' | 'new' | null;
}

interface PropsData {
  id: number,
  description: string
}

interface ProposIcons {
  onChange: (action: { type: 'edit' | 'delete' | 'new' }) => void;
}

const colorChip = {
  CRITICA: 'bg-red-600',
  ALTA: 'bg-red-400',
  MEDIA: 'bg-yellow-400',
  BAIXA: 'bg-green-400',
} as const

export default function Priority() {

  const [modal, setModal] = useState<PropsStateModal>({ open: false, data: {}, type: null })
  const [data, setData] = useState<PropsData[]>([])

  async function getAllPriority() {
    try {
      const response = await api.get("/getPriority")
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.message}`);
    }
  }

  async function saveStatus(description: PropsModal) {
    try {
      const responseSave = await api.post('/newPriority', description)
      if (responseSave.status === 200) {
        getAllPriority()
        setModal({ ...modal, open: false })
      }
    } catch (error) {
      console.log(`Erro ao salvar prioridade do atendimento`)
    }
  }

  async function deleteStatus() {
    try {
      const responseDelete = await api.delete(`/deletePriority?id=${modal.data.id}`,)
      if (responseDelete.status === 200) {
        getAllPriority()
        setModal({ ...modal, open: false })
      }
    } catch (error) {
      console.log(`${error}`)
    }
  }
  useEffect(() => {
    getAllPriority()
  }, [])

  return (
    <div>
      <div className="flex justify-end py-3 ">
        <Button onPress={() => setModal({ open: true, data: {}, type: 'new' })}>Novo status</Button>
      </div>
      <Table className="max-h-175 overflow-y-auto">
        <Table.ResizableContainer>
          <Table.Content aria-label="Table with resizable columns" className="min-w-175">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
                id
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="role" minWidth={220}>
                Descrição
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
                Ações
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {data.map((i) => (
                <Table.Row key={i.id}>
                  <Table.Cell>{i.id}</Table.Cell>
                  <Table.Cell><Chip className={`${colorChip[i.description as keyof typeof colorChip] || 'bg-gray-500'}`}>{i.description}</Chip> </Table.Cell>
                  <Table.Cell>
                    <Button onPress={() => setModal({ open: true, type: 'delete', data: i })} variant="danger-soft" isIconOnly>
                      <Trash />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
      <NewStatus open={modal.open && modal.type === 'new'} onClose={() => setModal({ open: false, data: null, type: null })} onSave={(value) => saveStatus(value)} />
      <DeleteModal title="Excluir status" onDelete={() => { deleteStatus() }} open={modal.open && modal.type === 'delete'} onClose={() => setModal({ ...modal, open: false })} text="Deseja excluir o status selecionado?" />
    </div>
  )
}

