'use client';

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { TTask } from '../type';
import { TaskTableCell } from './task-table-cell';
import { useState } from 'react';
import { useQuery } from '@/hook';
import { useSessionContext } from '@/provider/session-provider';

const columns = [
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'action',
    label: 'Ações',
  },
];

export function TaskTable() {
  const session = useSessionContext();
  const [rows, setRows] = useState<TTask[]>([]);
  const { isQuerying, onQuery } = useQuery<TTask[]>({
    url: `/api/task?${new URLSearchParams({ role: session?.user?.role?.id as string, id: session?.user?.id as string })}`,
    onSuccess: (data) => setRows(data),
  });

  return (
    <Table isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={rows}
        isLoading={isQuerying}
        loadingContent={<CircularProgress />}
        emptyContent="Sem registros"
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <TaskTableCell
                  item={item}
                  columnKey={columnKey}
                  onQuery={onQuery}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
