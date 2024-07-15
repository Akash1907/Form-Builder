
'use client'
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<[]>('http://164.52.200.229:9486/trends?period=week');
        setData(response.data.trends);
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
    <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {/* <StyledTableCell> Select All</StyledTableCell> */}
            <StyledTableCell>Channel</StyledTableCell>
            <StyledTableCell align="center">Duration	</StyledTableCell>
            <StyledTableCell align='center'>Agent Name</StyledTableCell>
            <StyledTableCell align="center">Customer ID</StyledTableCell>
            {/* <StyledTableCell align="center">Moments</StyledTableCell> */}
            <StyledTableCell align="center">Call ID</StyledTableCell>
            {/* <StyledTableCell align="center">View</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row:any,index:any) => (
            <StyledTableRow key={index}>
               {/* <StyledTableCell align="center"></StyledTableCell> */}
              <StyledTableCell component="th" scope="row" align="center">
                {row.medium_of_contact}
              </StyledTableCell>
              <StyledTableCell align="center">{row.duration}</StyledTableCell>
              <StyledTableCell align="center">{row.agent_name}</StyledTableCell>
              <StyledTableCell align="center">{row.client_name}</StyledTableCell>
              {/* <StyledTableCell align="center"> */}
              {/* <Stack direction="row" justifyContent="center"
  alignItems="center" spacing={2}>
  <Item sx={{backgroundColor:'green',color:'white'}}>02</Item>
  <Item sx={{backgroundColor:'red' ,color:'white'}}>10</Item>
  <Item sx={{backgroundColor:'black' ,color:'white'}}>02</Item>
</Stack> */}

              {/* </StyledTableCell> */}
              <StyledTableCell align="center">{row.call_id}</StyledTableCell>
              {/* <StyledTableCell align="center"><Button variant="contained" href='/quality-analysis/Evaluation-form'>View</Button></StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
    </TableContainer>
  );
}