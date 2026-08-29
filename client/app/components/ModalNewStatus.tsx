"use client";

import { useForm, Controller } from "react-hook-form";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { UserRoundCog } from "lucide-react";
import { useEffect } from "react";

export interface PropsModal {
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: PropsModal) => void;
  data?: PropsModal;
}

const defaultValues: PropsModal = {
  description: ""
};

export default function NewStatus({ open, onClose, onSave, data }: Props) {
  const { control, handleSubmit, reset, formState: { errors }, } = useForm<PropsModal>({ defaultValues });

  useEffect(() => {
    if (open) {
      reset(defaultValues)
    }
  }, [open])

  return (
    <Modal>
      <Modal.Backdrop isOpen={open} onOpenChange={onClose}>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onPress={onClose} />
            <Modal.Header>
              <Modal.Icon>
                <UserRoundCog size={48} strokeWidth={0.5} />
              </Modal.Icon>
              <Modal.Heading className="text-center">
                Novo Status
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  id="user-form"
                  onSubmit={handleSubmit(onSave)}
                  className="flex flex-col gap-4"
                >
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "O status é obrigatório" }}
                    render={({ field }) => (
                      <TextField className="w-full" variant="secondary">
                        <Label>Status</Label>
                        <Input {...field} value={field.value || ""} placeholder="Digite o status" />
                        {errors.description && (<span className="text-xs text-red-500 mt-1">{errors.description.message}</span>)}
                      </TextField>
                    )}
                  />

                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={onClose} variant="secondary">
                Cancelar
              </Button>
              <Button form="user-form" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}