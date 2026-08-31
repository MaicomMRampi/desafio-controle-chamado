"use client";

import { Button, Modal } from "@heroui/react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function ModalFirstLogin({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()

  return (
    <Modal>
      <Modal.Backdrop isOpen={open} onOpenChange={onClose} isKeyboardDismissDisabled>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md p-4">
            <Modal.CloseTrigger />
            <Modal.Header className="flex flex-col items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-200 text-blue-500 border border-amber-500/20">
                <Sparkles className="size-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-green-600">
                  Primeiro Acesso
                </span>
                <Modal.Heading className="text-lg text-slate-900 mt-0.5">
                  Bem-vindo ao Help Desk Bold Energy
                </Modal.Heading>
              </div>
            </Modal.Header>

            <Modal.Body className="space-y-2 text-slate-600 text-sm">
              <p className="font-medium text-slate-800">
                Sistema de agendamento e suporte a chamados.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Como este é o seu primeiro acesso, <span className="text-red-700">é necessário alterar suas credenciais de acesso</span> .
              </p>
            </Modal.Body>

            <Modal.Footer className="pt-2">
              <Button
                onClick={() => { router.push('/profile'), onClose }}
                className="w-full"
              >
                Continuar para a Plataforma
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}