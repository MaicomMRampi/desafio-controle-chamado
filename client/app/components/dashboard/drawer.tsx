"use client";

import { Button, Chip, Drawer } from "@heroui/react";
import { PropsObj } from "./ModalAddShedule";
import { Priority, Status } from './chipStatus'

interface PropsDrawer {
  open: boolean;
  onClose: () => void;
  data: PropsObj | null;
}

export function DrawerScheduling({ open, onClose, data }: PropsDrawer) {
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
                  {data.insertedDate && (
                    <div>
                      <span className="text-xs text-gray-400 block">Registrado em</span>
                      <span className="text-foreground">{formatDate(data.insertedDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Drawer.Body>

            <Drawer.Footer className="border-t pt-4">
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