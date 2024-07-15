'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(
  Sop_name: string,
  Call_Score: string,
  Best_score: string,
  Best_call: string,

) {
  return { Sop_name, Call_Score, Best_score, Best_call };
}

const rows = [
  createData("Opening", "5/10", "8/10", "openingcall_bestscore_audio"),
  createData("Opening", "5/10", "8/10", "openingcall_bestscore_audio"),
  createData("Opening", "5/10", "8/10", "openingcall_bestscore_audio"),
  createData("Opening", "5/10", "8/10", "openingcall_bestscore_audio"),
  createData("Opening", "5/10", "8/10", "openingcall_bestscore_audio"),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} className='mb-10'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SOP name</StyledTableCell>
            <StyledTableCell align="right">Call score</StyledTableCell>
            <StyledTableCell align="right">Best Score</StyledTableCell>
            <StyledTableCell align="right">Best Call</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Sop_name}>
              <StyledTableCell component="th" scope="row">
                {row.Sop_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Call_Score}</StyledTableCell>
              <StyledTableCell align="right">{row.Best_score}</StyledTableCell>
              <StyledTableCell align="right">{row.Best_call}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}