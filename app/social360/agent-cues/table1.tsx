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
  Call_ID: number,
  SOPs_found : string,
  Call_Score: string,
  AHT: string,
  Adherence: number,
  compaliace: number,
  Empathy: number 
) {
  return { Call_ID, SOPs_found, Call_Score, AHT, Adherence, compaliace, Empathy };
}

const rows = [
  createData(435678921, "25/30", "5/10", "03:00", 90, 10, 5),
  createData(435678921, "25/30", "5/10", "03:00", 90, 10, 5),
  createData(435678921, "25/30", "5/10", "03:00", 90, 10, 5),
  createData(435678921, "25/30", "5/10", "03:00", 90, 10, 5),
  createData(435678921, "25/30", "5/10", "03:00", 90, 10, 5),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Call ID</StyledTableCell>
            <StyledTableCell align="right">SOPs found </StyledTableCell>
            <StyledTableCell align="right">Call Score	</StyledTableCell>
            <StyledTableCell align="right">AHT</StyledTableCell>
            <StyledTableCell align="right">Adherence&nbsp;(%)</StyledTableCell>
            <StyledTableCell align="right">Compliance&nbsp;(%)</StyledTableCell>
            <StyledTableCell align="right">Empathy&nbsp;(%)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Call_ID}>
              <StyledTableCell component="th" scope="row">
                {row.Call_ID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.SOPs_found}</StyledTableCell>
              <StyledTableCell align="right">{row.Call_Score}</StyledTableCell>
              <StyledTableCell align="right">{row.AHT}</StyledTableCell>
              <StyledTableCell align="right">{row.Adherence}</StyledTableCell>
              <StyledTableCell align="right">{row.compaliace}</StyledTableCell>
              <StyledTableCell align="right">{row.Empathy}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}