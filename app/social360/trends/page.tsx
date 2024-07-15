// 'use client'
// import * as React from 'react';
// import {
//   LineChart,
//   lineElementClasses,
//   markElementClasses,
// } from '@mui/x-charts/LineChart';

// //const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [0, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'July',
// ];

// export default function DashedLineChart() {
//   return (
//     <LineChart
//       width={999}
//       height={600}
//       series={[
//         { data: pData, label: 'pv', id: 'pvId' },
//         //{ data: uData, label: 'uv', id: 'uvId' },
//       ]}
//       xAxis={[{ scaleType: 'point', data: xLabels }]}
//       sx={{
//         [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
//           strokeWidth: 1,
//         },
//         '.MuiLineElement-series-pvId': {
//           strokeDasharray: '5 5',
//         },
//         '.MuiLineElement-series-uvId': {
//           strokeDasharray: '3 4 5 2',
//         },
//         [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
//           fill: '#fff',
//         },
//         [`& .${markElementClasses.highlighted}`]: {
//           stroke: 'none',
//         },
//       }}
//     />
//   );
// }


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

// function createData(
//   Channel: string,
//   Duration: string,
//   Agent_name: string,
//   customer_id: string,
//   Call_time: string,
// ) {
//   return { Channel, Duration, Agent_name, customer_id, Call_time };
// }
// const rows = [
//   {
//       "checkbox": "checkbox",
//       "channel": "call",
//       "duration": "15:53 min",
//       "agent_name": "Shiv Khera",
//       "customer_id": "1234567890",
//       "call_time": "9/5/2021 | 7:04 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "call",
//       "duration": "10:45 min",
//       "agent_name": "John Doe",
//       "customer_id": "9876543210",
//       "call_time": "10/5/2021 | 5:30 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "chat",
//       "duration": "20:10 min",
//       "agent_name": "Jane Smith",
//       "customer_id": "2468135790",
//       "call_time": "11/5/2021 | 4:15 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "email",
//       "duration": "8:20 min",
//       "agent_name": "Robert Brown",
//       "customer_id": "3692581470",
//       "call_time": "12/5/2021 | 3:00 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "call",
//       "duration": "7:15 min",
//       "agent_name": "Emily White",
//       "customer_id": "9638527410",
//       "call_time": "13/5/2021 | 6:45 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "chat",
//       "duration": "12:05 min",
//       "agent_name": "Michael Green",
//       "customer_id": "2583691470",
//       "call_time": "14/5/2021 | 8:30 AM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "email",
//       "duration": "6:30 min",
//       "agent_name": "Sara Blue",
//       "customer_id": "7418529630",
//       "call_time": "15/5/2021 | 9:00 AM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "call",
//       "duration": "14:50 min",
//       "agent_name": "David Johnson",
//       "customer_id": "1472583690",
//       "call_time": "16/5/2021 | 2:15 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "chat",
//       "duration": "9:40 min",
//       "agent_name": "Anna Gray",
//       "customer_id": "8523697410",
//       "call_time": "17/5/2021 | 11:00 AM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "email",
//       "duration": "10:20 min",
//       "agent_name": "Peter Black",
//       "customer_id": "3697418520",
//       "call_time": "18/5/2021 | 1:00 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "call",
//       "duration": "17:30 min",
//       "agent_name": "Laura Brown",
//       "customer_id": "9631472580",
//       "call_time": "19/5/2021 | 4:20 PM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "chat",
//       "duration": "8:45 min",
//       "agent_name": "Alex Williams",
//       "customer_id": "2589631470",
//       "call_time": "20/5/2021 | 7:30 AM"
//   },
//   {
//       "checkbox": "checkbox",
//       "channel": "email",
//       "duration": "7:25 min",
//       "agent_name": "Mark Harris",
//       "customer_id": "7419632580",
//       "call_time": "21/5/2021 | 8:15 AM"
//   }
// ]

// const rows = [
//   createData('Call', '15:53 min', '	Shiv Khera', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Call', '10:45 min','John Doe', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Chat', '20:10 min	', 'Jane Smith','1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Email', '8:20 min	', 'Robert Brown	', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Email', '7:15 min', 'Emily White	', '1234567890', '	9/5/2021 | 7:04 PM'),
//  createData('Call', '15:53 min', '	Shiv Khera', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Call', '10:45 min','John Doe', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Chat', '20:10 min	', 'Jane Smith','1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Email', '8:20 min	', 'Robert Brown	', '1234567890', '	9/5/2021 | 7:04 PM'),
//   createData('Email', '7:15 min', 'Emily White	', '1234567890', '	9/5/2021 | 7:04 PM'),
// ];


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