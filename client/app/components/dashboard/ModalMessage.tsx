"use client";

import { api } from "@/app/lib/axiosInstance";
import { Button, Modal } from "@heroui/react";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import Chat from "../Chat";

interface ModalProps {
  open: boolean,
  onClose: () => void
  id: number
}
export function ModalMessage({ open, onClose, id }: ModalProps) {
  const [message, setMessage] = useState([])

  async function getAllMessage() {
    try {
      const responseMessage = await api.get(`/getMessages?id=${id}`)
      setMessage(responseMessage.data)
    } catch (error: any) {
      console.log(`Erro ao buscar as mensagens:${error?.message}`)
    }
  }

  useEffect(() => {
    if (!open) return
    getAllMessage()
  }, [open])

  return (
    <Modal>
      <Button variant="secondary">Open Modal</Button>
      <Modal.Backdrop isOpen={open} onOpenChange={onClose}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Chat historico={message} />
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Fechar
              </Button>
              <Button className="w-full" slot="close">
                Enviar Mensagem
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}