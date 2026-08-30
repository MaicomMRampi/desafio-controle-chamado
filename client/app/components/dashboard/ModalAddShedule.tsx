"use client";

import { api } from "@/app/lib/axiosInstance";
import { Button, Input, Label, Modal, Surface, TextArea, TextField, Select, ListBox } from "@heroui/react";
import { Headset } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { STATUS_OPTIONS } from './statusValues'

interface PaperProps {
  open: boolean,
  onClose: () => void,
  onSave: (values: PropsObj) => void,
}

export interface PropsObj {
  id: number | null
  title: string,
  description: string,
  client: string,
  technician_id: number | null,
  status: string,
  priority: string,
  openingDate: string | null
}

interface Tecnhicians {
  id: number,
  nome: string
}

const defaultValues: PropsObj = {
  id: null,
  title: "",
  description: "",
  client: "",
  technician_id: null,
  status: "",
  priority: "",
  openingDate: ""
}

export function ModalAddShedule({ open, onClose, onSave }: PaperProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<PropsObj>({ defaultValues })
  const [data, setData] = useState([])
  const [technicians, setThecnicians] = useState<Tecnhicians[]>([])

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

  async function getTechnicians() {
    try {
      const response = await api.get("/getTechnician")
      if (response.status === 200) {
        setThecnicians(response.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.message}`);
    }
  }
  useEffect(() => {
    if (open) {
      reset(defaultValues)
      getAllPriority()
      getTechnicians()
    }
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
              <Modal.Heading>Novo Chamado</Modal.Heading>
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
                  <Controller
                    name="client"
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
                        <Label>Cliente</Label>
                        <Input
                          {...field}
                          maxLength={40}
                          value={field.value || ""}
                          placeholder="Digite o nome do cliente"
                        />
                        {errors.client && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.client.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />
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
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: "O status é obrigatório" }}
                    render={({ field }) => (
                      <Select
                        value={field.value !== null ? String(field.value) : ""}
                        onChange={(key) => field.onChange(key)}
                        placeholder="Status"
                        variant="secondary"
                        className="w-full"
                      >
                        <Label>Status chamado</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {STATUS_OPTIONS?.map((i: any, index: any) => (
                              <ListBox.Item key={i.value} id={i.value} textValue={i.label}>
                                {i.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        {errors.status && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.status.message}
                          </span>
                        )}
                      </Select>
                    )}
                  />
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
                    name="openingDate"
                    control={control}
                    rules={{ required: "A data de abertura é obrigatória" }}
                    render={({ field }) => (
                      <TextField className="w-full" variant="secondary">
                        <Label>Data de Abertura</Label>
                        <Input
                          {...field}
                          type="date"
                          maxLength={40}
                          value={field.value || ''}
                          placeholder="Data de Abertura"
                        />
                        {errors.openingDate && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.openingDate.message}
                          </span>
                        )}
                      </TextField>
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
                      Cancel
                    </Button>
                    <Button type="submit">Send Message</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal >
  );
}