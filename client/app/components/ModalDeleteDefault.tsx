"use client";

import { Button, Modal } from "@heroui/react";
import { Info, UserRoundX } from "lucide-react";

interface Props {
  open: boolean,
  onClose: () => void,
  onDelete: () => void,
  text: string,
  title: string
}
export default function DeleteModal({ open, onClose, onDelete, text, title }: Props) {

  return (
    <div className="flex flex-wrap gap-4">
      <Modal isOpen={open} onOpenChange={onClose}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Info className="text-red-600" size={35} strokeWidth={0.5} />
                <Modal.Heading>
                  {title ?? 'Excluir'}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>{text ?? ''}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={onClose} slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button className="bg-red-600 text-white" onPress={onDelete} >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}