"use client";

import type { SortDescriptor } from "@heroui/react";
import { Button, Table } from "@heroui/react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Status, Priority } from './chipStatus'
import { UserAuth } from '../../page'
import { useAuth } from "@/app/utils/auth_provider";

export interface RowsProps {
  id: number,
  client: string
  description: string
  insertedDate: string
  openingDate: string
  status: string
  technician: string
  tecnicianName: string
  title: string
  userResponsive: number,
  priority: string
}

interface Rows {
  rows: RowsProps[]
  onView: (data: RowsProps) => void,
  onDelete: (data: RowsProps) => void
}

export default function TableHome({ rows, onView, onDelete }: Rows) {
  const { user, isAdmin }: UserAuth | any = useAuth()

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "status", direction: "ascending",
  });

  return (
    <>
      {isAdmin ? 'sim' : 'false'}
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Sortable table"
            className="min-w-150"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column allowsSorting isRowHeader id="status">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Status
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="title">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Cliente
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="cliente">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Titulo
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="tecnico">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Técnico
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="prioridade">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Prioridade
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="email">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Data de Abertura
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="actions">
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Ações
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {rows.map((user) => (
                <Table.Row key={user.id} id={user.id}>
                  <Table.Cell><Status value={user.status} /></Table.Cell>
                  <Table.Cell>{user.client}</Table.Cell>
                  <Table.Cell>{user.title}</Table.Cell>
                  <Table.Cell>{user.tecnicianName}</Table.Cell>
                  <Table.Cell><Priority value={user.priority} /></Table.Cell>
                  <Table.Cell>{user.openingDate ? new Date(user.openingDate).toLocaleDateString("pt-br") : '-'}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <Button onPress={() => onView(user)} isIconOnly variant="ghost">
                        <Eye className="text-blue-600" />
                      </Button>
                      {isAdmin && (
                        <>
                          <Button onPress={() => onDelete(user)} isIconOnly variant="ghost">
                            <Edit className="text-orange-600" />
                          </Button>
                          <Button onPress={() => onDelete(user)} isIconOnly variant="ghost">
                            <Trash2 className="text-red-500" />
                          </Button>
                        </>
                      )}
                    </div>

                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </>
  );
}