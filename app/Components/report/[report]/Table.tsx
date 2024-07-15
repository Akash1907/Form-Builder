import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';

export default function CustomDataGrid({ data }: { data: any }) {
  const columns = data.tables[data.tables_alias[0].alias].map((col: any) => ({
    field: col.name,
    headerName: col.alias,
    width: 150
  }));
  const rows = data.data.map((row: any, index: number) => ({
    id: index, ...row
  }));

  return (
    <Container sx={{ height: '100%', width: '100%', marginY: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
      />
    </Container>
  );
}
