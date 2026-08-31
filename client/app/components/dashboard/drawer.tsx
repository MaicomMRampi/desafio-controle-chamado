"use client";

import { Button, Chip, Drawer, Label, ListBox, Select } from "@heroui/react";
import { PropsObj } from "./ModalAddShedule";
import { Priority, Status } from './chipStatus'
import { STATUS_OPTIONS } from "./statusValues";
import { useAuth } from "@/app/utils/auth_provider";
import { UserAuth } from "@/app/page";

interface PropsDrawer {
  open: boolean;
  onClose: () => void;
  data: PropsObj | null
  onStatus: (value: string) => void
}

export function DrawerScheduling({ open, onClose, data, onStatus }: PropsDrawer) {
  const { user }: UserAuth | any = useAuth()
  if (!data) return null;

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

  return (
    <Drawer isOpen={open} onOpenChange={onClose}>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-full max-w-md">
            <Drawer.CloseTrigger onClick={onClose} />

            <Drawer.Header className="flex flex-col gap-2 border-b pb-4">
              <div className="flex items-center gap-2">
                <Priority value={data.priority} />
                <Status value={data.status} />
              </div>
              <div>
                <span className="text-xs text-gray-400">Chamado #{data.id}</span>
                <Drawer.Heading className="text-xl font-bold">
                  {data.title}
                </Drawer.Heading>
              </div>
            </Drawer.Header>

            <Drawer.Body className="py-4 space-y-4">
              <div className="rounded-xl bg-default-100 p-4 border border-default-200">
                <h2 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  Descrição do Chamado
                </h2>
                <p className="text-sm text-foreground whitespace-pre-line">
                  {data.description || "Nenhuma descrição informada."}
                </p>
              </div>

              <div className="rounded-xl bg-default-100 p-4 border border-default-200 space-y-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase">
                  Pessoas Envolvidas
                </h2>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block">Cliente</span>
                    <span className="font-medium text-foreground">{data.client}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Técnico Responsável</span>
                    <span className="font-medium text-foreground">
                      {data.tecnicianName || "Não atribuído"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-default-100 p-4 border border-default-200 space-y-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase">
                  Histórico e Registro
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block">Data de Abertura</span>
                    <span className="text-foreground">{formatDate(data.openingDate, 1)}</span>
                  </div>
                  {data.openingDate && (
                    <div>
                      <span className="text-xs text-gray-400 block">Registrado em</span>
                      <span className="text-foreground">{formatDate(data.openingDate)}</span>
                    </div>
                  )}
                </div>
              </div>
              {user?.role != 'cliente' && (
                <Select
                  placeholder="Status"
                  variant="secondary"
                  className="w-full"
                  onChange={(value) => onStatus(String(value))}
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