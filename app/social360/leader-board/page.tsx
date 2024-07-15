'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';

const columns: GridColDef = [
    { field: 'agent_id', headerName: 'ID', width: 100 },
    { field: 'agent_name', headerName: 'Agent name', width: 230 },
    { field: 'total_calls', headerName: 'Total calls', width: 230 },
    { field: 'overall_interaction_scores', headerName: 'Overall score', width: 250 },
    { field: 'opening_scores', headerName: 'Opening (Branding)', width: 250 },
    { field: 'performance_category', headerName: 'Customer verification', width: 200 },
];

export default function DataTable() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://164.52.200.229:9486/agents/performance');
        setData(response.data.agents_performance );
        console.log("data",response.data.agents_performance)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ height: 500, width: '100%' ,marginTop:'30px'}}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.agent_id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 10]}
        // checkboxSelection
      />
    </div>
  );
}