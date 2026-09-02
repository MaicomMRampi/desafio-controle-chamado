"use client";

import { useForm, Controller } from "react-hook-form";
import { Button, Input, Label, Modal, Surface, TextField, ListBox, Select } from "@heroui/react";
import { UserRoundCog } from "lucide-react";
import { useEffect } from "react";

export interface PropsModal {
  id: null | number;
  name: string;
  email: string;
  password: string;
  status?: boolean | null;
  role: string;
  firstLogin?: boolean
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: PropsModal) => void;
  data?: PropsModal;
  id?: number;
}

const defaultValues: PropsModal = {
  id: null,
  name: "",
  email: "",
  password: "",
  role: "",
  status: null,
};

const role = [
  {
    label: 'Administrador',
    value: 'administrador'
  },
  {
    label: 'Técnico',
    value: 'tecnico'
  },
  {
    label: 'Cliente',
    value: 'cliente'
  }
]

export default function NewUser({ open, onClose, onSave, data, id }: Props) {
  const { control, handleSubmit, reset, formState: { errors }, } = useForm<PropsModal>({ defaultValues: data || defaultValues, });

  useEffect(() => {
    if (open) {
      reset(data?.id ? { ...data, password: "" } : defaultValues);
    }
  }, [data, open, reset]);

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
              <Modal.Heading>
                {data?.id ? "Editar perfil" : "Novo perfil de acesso"}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  key={data?.id ?? "new"}
                  id="user-form"
                  onSubmit={handleSubmit(onSave)}
                  className="flex flex-col gap-4"
                >
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "O nome é obrigatório" }}
                    render={({ field }) => (
                      <TextField className="w-full" variant="secondary">
                        <Label>Nome</Label>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Digite o nome do usuário"
                        />
                        {errors.name && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "O email é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido",
                      },
                    }}
                    render={({ field }) => (
                      <TextField className="w-full" variant="secondary">
                        <Label>Email</Label>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />

                  {!data?.id && (
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: !data?.id ? "A senha é obrigatória" : false,
                        minLength: {
                          value: 4,
                          message: "A senha deve ter no mínimo 4 caracteres",
                        }
                      }}
                      render={({ field }) => (
                        <TextField className="w-full" variant="secondary">
                          <Label>Senha</Label>
                          <Input
                            {...field}
                            type="password"
                            value={field.value || ""}
                            placeholder="Senha"
                          />
                          {errors.password && (
                            <span className="text-xs text-red-500 mt-1">
                              {errors.password.message}
                            </span>
                          )}
                        </TextField>
                      )}
                    />
                  )}
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "O perfil é obrigatório" }}
                    render={({ field }) => (
                      <Select
                        value={field.value || null}
                        onChange={(key) => field.onChange(key)}
                        placeholder="Perfil de acesso"
                        variant="secondary"
                        className="w-full"
                      >
                        <Label>Perfil de acesso</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {role?.map((i) => (
                              <ListBox.Item key={i.value} id={i.value} textValue={i.label}>
                                {i.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        {errors.role && (
                          <span className="text-xs text-red-500 mt-1">
                            {errors.role.message}
                          </span>
                        )}
                      </Select>
                    )}
                  />
                  {data?.id && (
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isDisabled={id === data?.id}
                          value={field.value === null || field.value === undefined ? null : String(field.value)}
                          onChange={(key) => field.onChange(key === "true")}
                          placeholder="Status"
                          variant="secondary"
                          className="w-full"
                        >
                          <Label>Status</Label>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item key="true" id="true" textValue="Ativo">
                                Ativo
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item key="false" id="false" textValue="Inativo">
                                Inativo
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      )}
                    />
                  )}
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
    </Modal >
  );
}