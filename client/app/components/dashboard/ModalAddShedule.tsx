"use client"

// hero ui
import { Button, Input, Label, Modal, Surface, TextArea, TextField, Select, ListBox } from "@heroui/react"

import { Headset } from "lucide-react"

// hooks
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"

// importações do projeto
import { STATUS_OPTIONS } from './statusValues'
import { api } from "@/app/lib/axiosInstance"
import { useAuth } from "@/app/utils/auth_provider"
import { UserAuth } from "@/app/page"

interface PaperProps {
  open: boolean,
  onClose: () => void,
  onSave: (values: PropsObj) => void,
  valuesOnEdit: PropsObj | null
}

export interface PropsObj {
  id: number | null
  title: string,
  description: string,
  technician_id?: number | null,
  status: string,
  priority: string,
  openingDate?: string
  tecnicianName?: string,
  clientId?: number | null
  client?: string
}

interface ValuesDatabase {
  id: number,
  nome: string
}

const defaultValues: PropsObj = {
  id: null,
  title: "",
  description: "",
  clientId: null,
  technician_id: null,
  status: "",
  priority: "",
  openingDate: ""
}

export function ModalAddShedule({ open, onClose, onSave, valuesOnEdit }: PaperProps) {
  const { user, isAdmin }: UserAuth | any = useAuth()
  const { control, handleSubmit, reset, formState: { errors } } = useForm<PropsObj>({ defaultValues })
  const [data, setData] = useState([])
  const [technicians, setThecnicians] = useState<ValuesDatabase[]>([])
  const [clients, setClients] = useState<ValuesDatabase[]>([])
  const isEditing = valuesOnEdit?.id != null

  async function getAllPriority() {
    try {
      const response = await api.get("/getPriority")
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.response?.data?.message}`)
    }
  }

  async function getUsers() {
    try {
      const response = await api.get("/getUsersSheduling")
      if (response.status === 200) {
        const findClient = response.data.find((item: any) => item.perfil === 'cliente').usuarios || []
        const findTecnician = response.data.find((item: any) => item.perfil === 'tecnico').usuarios || []
        setClients(findClient)
        setThecnicians(findTecnician)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.response?.data?.message}`)
    }
  }

  useEffect(() => {
    if (!open) return
    reset(valuesOnEdit ? valuesOnEdit : defaultValues)
    getAllPriority()
    getUsers()

  }, [open])

  return (
    <Modal>
      <Modal.Backdrop isOpen={open} onOpenChange={onClose}>
        <Modal.Container placement="auto" size="md">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Headset size={48} strokeWidth={0.5} />
              </Modal.Icon>
              <Modal.Heading>{isEditing ? `Editando o chamado ${valuesOnEdit?.id}` : 'Novo Chamado'} </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
                  <Controller
                    name="title"
                    control={control}
                    rules={{
                      required: "O titulo é obrigatório",
                      maxLength: {
                        message: 'Máximo de caracteres  40',
                        value: 40
                      },
                      minLength: {
                        message: 'O titulo deve conter no minimo 5 caracteres',
                        value: 5
                      }
                    }}
                    render={({ field }) => (
                      <TextField className="w-full" variant="secondary">
                        <Label>Titulo</Label>
                        <Input
                          {...field}
                          disabled={isEditing}
                          maxLength={40}
                          value={field.value || ""}
                          placeholder="Digite o nome do usuário"
                        />
                        {errors.title && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.title.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />
                  {isAdmin && (
                    <Controller
                      name="clientId"
                      control={control}
                      rules={{ required: "O cliente é obrigatório" }}
                      render={({ field }) => (
                        <Select
                          isDisabled={isEditing}
                          value={field.value ? String(field.value) : ""}
                          onChange={(key) => {
                            field.onChange(Number(key))
                          }}
                          placeholder="Cliente"
                          variant="secondary"
                          className="w-full"
                        >
                          <Label>Cliente</Label>

                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>

                          <Select.Popover>
                            <ListBox>
                              {clients.map((client) => (
                                <ListBox.Item
                                  key={client.id}
                                  id={String(client.id)}
                                  textValue={client.nome}
                                >
                                  {client.nome}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>

                          {errors.clientId && (
                            <span className="text-xs text-red-500 mt-1">
                              {errors.clientId.message}
                            </span>
                          )}
                        </Select>
                      )}
                    />
                  )}
                  {isAdmin && (
                    <Controller
                      name="technician_id"
                      control={control}
                      rules={{ required: "O técnico é obrigatório" }}
                      render={({ field }) => (
                        <Select
                          value={field.value || ''}
                          onChange={(key) => field.onChange(key)}
                          placeholder="Técnico"
                          variant="secondary"
                          className="w-full"
                        >
                          <Label>Técnico Responsável</Label>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              {technicians?.map((i: any, index: any) => (
                                <ListBox.Item key={i.id} id={i.id} textValue={i.nome}>
                                  {i.nome}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                          {errors.technician_id && (
                            <span className="text-xs text-red-500 mt-1">
                              {errors.technician_id.message}
                            </span>
                          )}
                        </Select>
                      )}
                    />

                  )}
                  <Controller
                    name="priority"
                    control={control}
                    rules={{ required: "A prioridade é obrigatória" }}
                    render={({ field }) => (
                      <Select
                        value={field.value || ''}
                        onChange={(key) => field.onChange(key)}
                        placeholder="Prioridade do Chamado"
                        variant="secondary"
                        className="w-full"
                      >
                        <Label>Prioridade do Chamado</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {data?.map((i: any, index: any) => (
                              <ListBox.Item key={i.id} id={i.description} textValue={i.description}>
                                {i.description}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        {errors.priority && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.priority.message}
                          </span>
                        )}
                      </Select>
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: "A descrição é obrigatória",
                      maxLength: {
                        message: 'Máximo de caracteres 200',
                        value: 200
                      },
                      minLength: {
                        message: 'A descrição deve conter no minimo 20 caracteres',
                        value: 20
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <TextArea
                          {...field}
                          maxLength={200}
                          name="description"
                          value={field.value}
                          variant="secondary"
                          className="h-20 w-full"
                          placeholder="Informe uma descrição"
                        />
                        {errors.description && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.description.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      fechar
                    </Button>
                    <Button type="submit"> {isEditing ? "Salvar alterações" : "Criar chamado"}</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal >
  )
}