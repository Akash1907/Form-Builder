"use client";

import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "../../Components/muiIcons/muiIcons";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
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
        const response = await axios.get<[]>(
          "http://164.52.200.229:9486/interaction_details"
        );
        setData(response.data.interaction_details);
        console.log("data", response.data.interaction_details);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <TableContainer component={Paper} className="mt-10">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              Social Media Platform
            </StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer Username</StyledTableCell>

            <StyledTableCell align="center">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              <StyledTableCell align="center">Facebook</StyledTableCell>
              <StyledTableCell align="center">Krishna Kumar</StyledTableCell>
              <StyledTableCell align="center">kri@123</StyledTableCell>

              <StyledTableCell align="center">
                {" "}
                <Link
                  href={{
                    pathname: "/social360/Evaluation-form/Facebook",
                    // query: { clientId: row.call_id },
                  }}
                  passHref
                >
                  <Button variant="contained">View</Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center">Instagram</StyledTableCell>
              <StyledTableCell align="center">Node Red</StyledTableCell>
              <StyledTableCell align="center">node@11111</StyledTableCell>

              <StyledTableCell align="center">
                {" "}
                <Link
                  href={{
                    pathname: "/social360/Evaluation-form/Instagram",
                    // query: { clientId: row.call_id },
                  }}
                  passHref
                >
                  <Button variant="contained">View</Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          {data.map((row: any) => (
            <StyledTableRow key={row.checkbox}>
              <StyledTableCell align="center">{row.channel}</StyledTableCell>
              <StyledTableCell align="center">{row.agent_name}</StyledTableCell>
              <StyledTableCell align="center">{row.call_id}</StyledTableCell>

              <StyledTableCell align="center">
                {" "}
                <Link
                  href={{
                    pathname: "/social360/Evaluation-form",
                    query: { clientId: row.call_id },
                  }}
                  passHref
                >
                  <Button variant="contained">View</Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
