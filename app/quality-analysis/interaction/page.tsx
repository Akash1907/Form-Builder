"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import MailIcon from '@mui/icons-material/Mail';

import {
  TableContainer,
  TableHead,
  TableRow,
  WifiCalling3Icon,
  TableBody,
  Table,
  TablePagination,
  Button,
  Paper,

  } from '../../Components/muiIcons/muiIcons';


const iconMapping:any = {
  call: WifiCalling3Icon,
  email: MailIcon,
  chat: ChatIcon,
};
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://164.52.200.229:9486/interaction_details');
        setData(response.data.interaction_details);
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

  const navigateToDashboard = (call_id: any) => {
    const dataToSend = {
      call_id: call_id,
      // Add more key-value pairs as needed
    };

    // Construct the URL with query parameters
    const queryParams = new URLSearchParams(dataToSend).toString();
console.log("queryParams",queryParams)
    // Navigate to the dashboard page with query parameters
    router.push(`/quality-analysis/Evaluation-form?${queryParams}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className='mt-10'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Channel</StyledTableCell>
            <StyledTableCell align="center">Duration</StyledTableCell>
            <StyledTableCell align='center'>Agent Name</StyledTableCell>
            <StyledTableCell align="center">Customer ID</StyledTableCell>
            <StyledTableCell align="center">Call Time</StyledTableCell>
            <StyledTableCell align="center">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => 
      
      {  const IconComponent = iconMapping[row.channel];
        return  (
            <StyledTableRow key={row.call_id}>
              <StyledTableCell component="th" scope="row" align="center">
                {/* {row.channel} */}
                {IconComponent ? <IconComponent /> : row.channel}
              </StyledTableCell>
              <StyledTableCell align="center">{row.duration}</StyledTableCell>
              <StyledTableCell align="center">{row.agent_name}</StyledTableCell>
              <StyledTableCell align="center">{row.call_id}</StyledTableCell>
              <StyledTableCell align="center">{row.start_time}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="contained" onClick={() => navigateToDashboard(row.call_id)}>View</Button>
              </StyledTableCell>
            </StyledTableRow>
          )}
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
