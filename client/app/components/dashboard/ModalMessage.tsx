"use client";

import { api } from "@/app/lib/axiosInstance";
import { Button, Modal, TextArea } from "@heroui/react";
import { Mail, MailBadge, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import Chat from "../Chat";
import { showErrorToast, showSuccessToast } from "../toastDefault";

interface ModalProps {
  open: boolean,
  onClose: () => void
  id: number
}
export function ModalMessage({ open, onClose, id }: ModalProps) {
  const [allMessage, setAllMessage] = useState([])
  const [message, setMessage] = useState('')

  async function getAllMessage() {
    try {
      const responseMessage = await api.get(`/getMessages?id=${id}`)
      setAllMessage(responseMessage.data)
    } catch (error: any) {
      console.log(`Erro ao buscar as mensagens:${error?.message}`)
    }
  }

  async function sendMessage(type = 'publica') {
    try {
      if (message.length === 0) return showErrorToast('O campo da mensagem é obrigatório')
      const response = await api.post('/saveNote', { message, type, id })
      getAllMessage()
      setMessage('')
      showSuccessToast('Mensagem enviada com sucesso !')
    } catch (error: any | unknown) {
      showErrorToast('O campo da mensagem é obrigatório')
      console.log(`Erro ao enviar a mensagem:${error?.message}`)
    }
  }

  useEffect(() => {
    if (!open) return
    getAllMessage()
  }, [open])

  return (
    <Modal>
      <Modal.Backdrop isOpen={open} onOpenChange={onClose}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <MailBadge className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Histórico de mensagens</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-50 w-full">
                <Chat history={allMessage} />
              </div>
              <div>
                <TextArea maxLength={240} fullWidth variant="secondary" placeholder="Adicione a mensagem na conversa" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Fechar
              </Button>
              <Button className="w-full" onClick={() => sendMessage()}>
                Enviar Mensagem
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}