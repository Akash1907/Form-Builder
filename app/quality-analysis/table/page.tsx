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
  Name: string,
  score: string,
  your_score: string,
  Due_Date: string,
  Actions: string,
) {
  return { Name, score, your_score, Due_Date, Actions };
}

const rows = [
  createData('Training name 1 Auto-assign', 'Good', 'Need improvement', 'May 9, 2021 | 7:04 PM', 'View'),
  createData('Training name 1 Auto-assign', 'Good','Need improvement', 'May 9, 2021 | 7:04 PM', 'View'),
  createData('Training name 1 Auto-assign', 'Good', 'Need improvement','May 9, 2021 | 7:04 PM', 'View'),
  createData('Training name 1 Auto-assign', 'Good', 'Need improvement', 'May 9, 2021 | 7:04 PM', 'View'),
  createData('Training name 1 Auto-assign', 'Good', 'Need improvement', 'May 9, 2021 | 7:04 PM', 'View'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Training name</StyledTableCell>
            <StyledTableCell align="right">Target score	</StyledTableCell>
            <StyledTableCell align='right'>Your score</StyledTableCell>
            <StyledTableCell align="right">Due date</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Name}>
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.score}</StyledTableCell>
              <StyledTableCell align="right">{row.your_score}</StyledTableCell>
              <StyledTableCell align="right">{row.Due_Date}</StyledTableCell>
              <StyledTableCell align="right">{row.Actions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
    </TableContainer>
  );
}