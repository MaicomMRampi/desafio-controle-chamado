"use client";

// hero ui
import { Button, Chip, Table } from "@heroui/react";
import { Pencil, UserRoundX } from 'lucide-react';

// hooks
import { useEffect, useState } from "react";

// importações do projeto
import { showErrorToast, showSuccessToast } from "../toastDefault";
import NewUser, { PropsModal } from "@/app/components/ModalNewUser";
import { api } from "@/app/lib/axiosInstance";
import DeleteModal from "@/app/components/ModalDeleteDefault";
import { useAuth } from "@/app/utils/auth_provider";

interface PropsStateModal {
  open: boolean;
  data: any;
  type: 'edit' | 'delete' | 'new' | null;
}

interface ProposIcons {
  onChange: (action: { type: 'edit' | 'delete' | 'new' }) => void;
  id?: number;
  idUserLogin?: number;
}

const Icons = ({ onChange, id, idUserLogin }: ProposIcons) => {
  return (
    <div className="flex gap-5">
      <Button onPress={() => onChange({ type: 'edit' })} variant="outline" isIconOnly>
        <Pencil size={30} />
      </Button>
      <Button isDisabled={id === idUserLogin} onPress={() => onChange({ type: 'delete' })} variant="danger-soft" isIconOnly>
        <UserRoundX size={30} />
      </Button>
    </div>
  )
}

export default function AdminPage() {
  const [modal, setModal] = useState<PropsStateModal>({ open: false, data: {}, type: null })
  const [users, setUsers] = useState<PropsModal[]>([])
  const { user }: null | any = useAuth()

  async function getAllUsers() {
    try {
      const response = await api.get("/getUsers")
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao buscar usuários: ${error?.response?.data?.message}`);
    }
  }

  async function deleteUser() {
    try {
      const response = await api.delete(`/deleteUser?id=${modal.data.id}`)
      if (response.status === 200) {
        showSuccessToast(response?.data?.message)
        getAllUsers()
        setModal({ ...modal, open: false })
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao deletar usuário: ${error?.response?.data?.message}`);
    }
  }

  async function saveUser(data: PropsModal) {
    try {
      const response = modal.type === 'new' ? await api.post('/newUser', data) : await api.put('/editUser', data)
      if (response.status === 200) {
        showSuccessToast(response?.data?.message)
        getAllUsers()
        setModal({ ...modal, open: false })
      }
    } catch (error: any | unknown) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao criar usuário: ${error?.response?.data?.message}`);
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
              {users.map((use) => (
                <Table.Row key={use.id}>
                  <Table.Cell>{use.name}</Table.Cell>
                  <Table.Cell>{use.role}</Table.Cell>
                  <Table.Cell>
                    <Chip color={use.status ? "success" : "danger"} size="sm" variant="soft">
                      {use.status ? "Ativo" : "Inativo"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Icons id={Number(use?.id)} idUserLogin={Number(user?.id)} onChange={(action) => {
                      if (action.type === 'edit') {
                        setModal({ open: true, data: use, type: 'edit' });
                      } else if (action.type === 'delete') {
                        setModal({ open: true, data: use, type: 'delete' });
                      }
                    }} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
      <NewUser id={Number(user?.id)} data={modal.data} onSave={(values) => saveUser(values)} open={modal.open && (modal.type === 'new' || modal.type === 'edit')} onClose={() => setModal({ ...modal, open: false })} />
      <DeleteModal title="Excluir Usuário" open={modal.open && modal.type === 'delete'} onClose={() => setModal({ ...modal, open: false })} onDelete={deleteUser} text="Tem certeza que deseja excluir este usuário?" />
    </div>
  )
}

