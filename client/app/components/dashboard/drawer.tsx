"use client";

import { Button, Chip, Drawer, Label, ListBox, Select, Tabs, TextArea } from "@heroui/react";
import { PropsObj } from "./ModalAddShedule";
import { Priority, Status } from './chipStatus'
import { STATUS_OPTIONS } from "./statusValues";
import { useAuth } from "@/app/utils/auth_provider";
import { UserAuth } from "@/app/page";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axiosInstance";
import { showErrorToast } from "../toastDefault";

interface PropsDrawer {
  open: boolean;
  onClose: () => void;
  data: PropsObj | null
  onStatus: (value: string, type: string, id: number) => void
}

interface PropsData {
  id: number,
  description: string
}

interface UpdateProps {
  priority: string,
  status: string
}

export function DrawerScheduling({ open, onClose, data, onStatus }: PropsDrawer) {
  const { user }: UserAuth | any = useAuth()
  const [dataPriority, setDataPriority] = useState<PropsData[]>([])
  const [updateState, setUpdateState] = useState<UpdateProps>({ priority: '', status: '' })
  const [message, setMessage] = useState('')

  const formatDate = (dateString?: string, type?: number) => {
    if (!dateString) return "-";
    if (type != 1) {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return new Date(dateString).toLocaleDateString("pt-BR")
    }
  };

  async function getAllPriority() {
    try {
      const response = await api.get("/getPriority")
      if (response.status === 200) {
        setDataPriority(response.data)
      }
    } catch (error: any | unknown) {
      console.log(`Erro ao buscar usuários: ${error?.response?.data?.message}`);
    }
  }

  async function saveNote(type: string) {
    try {
      if (message.length === 0) return showErrorToast('O campo da mensagem é obrigatório')
      const response = await api.post('/saveNote', { message, type, data })
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message)
      console.log(`Erro ao salvar mensagem, ${error?.message}`)
    }
  }

  useEffect(() => {
    if (open) {
      getAllPriority()
      setUpdateState(prev => ({
        ...prev,
        status: data?.status ?? '',
        priority: data?.priority ?? ''
      }))
    }
  }, [open, data])

  if (!data) return null;

  return (
    <Drawer isOpen={open} onOpenChange={onClose}>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-xl">
            <Drawer.CloseTrigger onClick={onClose} />

            <Drawer.Header className="flex flex-col gap-2 border-b pb-4">
              <h1 className="font-bold">Gerenciar chamado # {data.id}</h1>
              <div className="flex items-center gap-2">
                <Priority value={updateState?.priority} />
                <Status value={updateState?.status} />
              </div>

            </Drawer.Header>

            <Drawer.Body className="py-4 space-y-4">
              <Tabs className="w-full">
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Options">
                    <Tabs.Tab id="Dados do Chamado">
                      Detalhes do Chamado
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="analytics">
                      Mensagens
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel className="pt-4" id="Dados do Chamado">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-default-100 border border-default-200">
                      <div>
                        <span className="text-xs font-medium text-default-400 uppercase tracking-wider block">
                          Prioridade
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {data.priority || "Normal"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-default-400 uppercase tracking-wider block">
                          Abertura
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {formatDate(data.openingDate)}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-default-100 p-4 border border-default-200 space-y-1">
                      <h3 className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                        Descrição do Chamado
                      </h3>
                      <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                        {data.description || "Nenhuma descrição informada."}
                      </p>
                    </div>
                    <div className="rounded-xl bg-default-100 p-4 border border-default-200 space-y-3">
                      <h3 className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                        Pessoas Envolvidas
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-xs text-default-400 block">Cliente</span>
                          <span className="font-medium text-foreground">{data.client}</span>
                        </div>
                        <div>
                          <span className="text-xs text-default-400 block">Técnico Responsável</span>
                          <span className="font-medium text-foreground">
                            {data.tecnicianName || "Não atribuído"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="my-8 font-semibold">Ações principais</h1>

                  <div className="flex gap-2">
                    {user?.role != 'cliente' && (
                      <Select
                        placeholder="Status"
                        variant="secondary"
                        className="w-full"
                        value={updateState?.status}
                        onChange={(value) => {
                          onStatus(String(value), 'status', Number(data?.id));
                          setUpdateState(prev => ({
                            ...prev,
                            status: String(value),
                          }))
                        }}
                      >
                        <Label>Atualizar Status</Label>
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
                      </Select>
                    )}
                    {user?.role != 'cliente' && (
                      <Select
                        placeholder="Prioridade"
                        variant="secondary"
                        className="w-full"
                        value={updateState?.priority}
                        onChange={(value) => {
                          onStatus(String(value), 'priority', Number(data?.id));
                          setUpdateState(prev => ({
                            ...prev,
                            priority: String(value)
                          }))
                        }}
                      >
                        <Label>Atualizar Prioridade</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {dataPriority?.map((i: any, index: any) => (
                              <ListBox.Item key={i.description} id={i.description} textValue={i.description}>
                                {i.description}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel className="pt-4 min-h-full" id="analytics">
                  <h1>Ultima anotação interna</h1>
                  <div className="max-h-20 overflow-y-auto rounded-2xl border p-4 border-yellow-400 my-2">
                    fd
                  </div>
                  <h1>Histórico de mensagens</h1>
                  <div className="h-100 overflow-y-auto max-h-100 border rounded-2xl border-blue-900 my-2">
                  </div>
                  <TextArea maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite aqui a mensagem ou a solução" className={"w-full"} rows={4} variant="secondary" />
                  <div className="w-full flex justify-between my-4">
                    <Button className={"bg-amber-500"} onPress={() => saveNote('interna')}>Salvar nota interna</Button>
                    <Button onPress={() => saveNote('publica')}>Enviar Mensagem ao cliente</Button>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </Drawer.Body>
            <Drawer.Footer className="border-t pt-4">
              <Button className="w-full">
                Concluir Atendimento
              </Button>
              <Button variant="secondary" onClick={onClose} className="w-full">
                Fechar
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}