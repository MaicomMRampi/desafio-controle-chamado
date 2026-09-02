"use client";

import { Button, Modal } from "@heroui/react";
import { CircleCheckBig, Info, UserRoundX } from "lucide-react";

interface Props {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
}
export default function CompleteService({ open, onClose, onConfirm}: Props) {

  return (
    <div className="flex flex-wrap gap-4">
      <Modal isOpen={open} onOpenChange={onClose}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <CircleCheckBig />
                <Modal.Heading>
                  Concluir chamado?
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                Deseja concluir o chamado? Ao concluir, somente admins poderam reabrir o mesmo.
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={onClose} slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button className="bg-blue-500 text-white" onPress={onConfirm} >
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