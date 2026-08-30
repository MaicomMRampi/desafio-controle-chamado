"use client";

import DeleteModal from "@/app/components/ModalDeleteDefault";
import NewUser, { PropsModal } from "@/app/components/ModalNovoUsuario";
import { api } from "@/app/lib/axiosInstance";
import { Button, Chip, Table } from "@heroui/react";
import { Pencil, UserRoundX } from 'lucide-react';
import { useEffect, useState } from "react";

interface PropsStateModal {
  open: boolean;
  data: any;
  type: 'edit' | 'delete' | 'new' | null;
}

interface ProposIcons {
  onChange: (action: { type: 'edit' | 'delete' | 'new' }) => void;
}

const Icons = ({ onChange }: ProposIcons) => {
  return (
    <div className="flex gap-5">
      <Button onPress={() => onChange({ type: 'edit' })} variant="outline" isIconOnly>
        <Pencil size={30} />
      </Button>
      <Button onPress={() => onChange({ type: 'delete' })} variant="danger-soft" isIconOnly>
        <UserRoundX size={30} />
      </Button>
    </div>
  )
}

export default function AdminPage() {

  const [modal, setModal] = useState<PropsStateModal>({ open: false, data: {}, type: null })
  const [users, setUsers] = useState<PropsModal[]>([])

  async function getAllUsers() {
    try {
      const response = await api.get("/getUsers")
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.message}`);
    }
  }

  async function deleteUser() {
    try {
      const response = await api.delete(`/deleteUser?id=${modal.data.id}`)
      if (response.status === 200) {
        getAllUsers()
        setModal({ ...modal, open: false })
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao deletar usuário: ${error?.message}`);
    }
  }

  async function saveUser(data: PropsModal) {
    try {
      const response = modal.type === 'new' ? await api.post('/newUser', data) : await api.put('/editUser', data)
      if (response.status === 200) {
        getAllUsers()
        setModal({ ...modal, open: false })
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao criar usuário: ${error?.message}`);
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <div className="flex justify-end py-3">
        <Button onPress={() => setModal({ open: true, data: {}, type: 'new' })}>Novo Usuário</Button>
      </div>
      <Table className="max-h-175 overflow-y-auto">
        <Table.ResizableContainer>
          <Table.Content aria-label="Table with resizable columns" className="min-w-175">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
                Nome
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="role" minWidth={220}>
                Perfil
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
                Email
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
                Ações
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Chip color={user.status ? "success" : "danger"} size="sm" variant="soft">
                      {user.status ? "Ativo" : "Inativo"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Icons onChange={(action) => {
                      if (action.type === 'edit') {
                        setModal({ open: true, data: user, type: 'edit' });
                      } else if (action.type === 'delete') {
                        setModal({ open: true, data: user, type: 'delete' });
                      }
                    }} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
      <NewUser data={modal.data} onSave={(values) => saveUser(values)} open={modal.open && (modal.type === 'new' || modal.type === 'edit')} onClose={() => setModal({ ...modal, open: false })} />
      <DeleteModal title="Excluir Usuário" open={modal.open && modal.type === 'delete'} onClose={() => setModal({ ...modal, open: false })} onDelete={deleteUser} text="Tem certeza que deseja excluir este usuário?" />
    </div>
  )
}

