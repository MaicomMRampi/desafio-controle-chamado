import { Button, Input, Label, ListBox, Select } from "@heroui/react";

interface PropsFilter {
  onFilter: (key: keyof filter, value: string) => void
  onClear: () => void,
  statusFilter: string[]
  priorityFilter: string[]
  filterState: filter
}

interface filter {
  priority?: string,
  all?: string,
  date?: string,
  status?: string
}

export default function FiltersScheduling({ onFilter, statusFilter, priorityFilter, filterState, onClear }: PropsFilter) {
  return (
    <div className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Filtros de Busca</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-slate-700">Buscar</Label>
          <Input
            onChange={(e) => onFilter("all", e.target.value)}
            value={filterState.all}
            size={20}
            placeholder="Buscar chamados...(titulo, descricao, id, cliente)"
            type="text"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-slate-700">Data de abertura</Label>
          <Input
            onChange={(e) => onFilter('date', e.target.value)}
            value={filterState.date}
            size={20}
            placeholder="Data de abertura"
            type='date'
            className="w-full"
          />
        </div>

        <Select
          onChange={(value) => {
            if (value !== null) {
              onFilter("status", String(value))
            }
          }}
          placeholder="Selecione o status"
          value={filterState.status}
        >
          <Label className="text-sm font-medium text-slate-700 mb-1.5 block">Status do Agendamento</Label>
          <Select.Trigger className="w-full">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {statusFilter.map(st => (
                <ListBox.Item key={st} id={st} textValue={st}>
                  {st}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          onChange={(value) => {
            if (value !== null) {
              onFilter("priority", String(value))
            }
          }}
          placeholder="Selecione a prioridade"
          value={filterState.priority}
        >
          <Label className="text-sm font-medium text-slate-700 mb-1.5 block">Prioridade</Label>
          <Select.Trigger className="w-full">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {priorityFilter.map(pr => (
                <ListBox.Item key={pr} id={pr} textValue={pr}>
                  {pr}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Button onPress={onClear} className="w-full" >
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}