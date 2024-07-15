import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Define types for the props
interface OutputTableProps {
  apiResponse: {
    response: {
      [key: string]: [number, number, number?];
      total: any;
    };
  };
}

// Define types for the data structure
interface TableRowData {
  name: string;
  score: number;
  maxScore: number;
  matchedPhrases?: number;
}

function OutputTable({ apiResponse }: OutputTableProps) {
  function createData(
    name: string,
    score: number,
    maxScore: number,
    matchedPhrases?: number
  ): TableRowData {
    return { name, score, maxScore, matchedPhrases };
  }

  // Extracting and structuring data from apiResponse
  const rows = Object.entries(apiResponse.response).reduce<TableRowData[]>(
    (acc, [key, value]) => {
      if (key !== "total") {
        // Skipping the 'total' key
        acc.push(
          createData(
            key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            value[0],
            value[1],
            value[2]
          )
        );
      }
      return acc;
    },
    []
  );

  // Component rendering the table
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "hsla(0, 0%, 50%, 0.2)" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Score
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Max Possible Score
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Matched Phrases
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.maxScore}</TableCell>
                {/* Displaying the matchedPhrases only if it exists */}
                <TableCell align="right">
                  {row.matchedPhrases ? row.matchedPhrases : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 border w-max rounded-full px-4 py-1">
        Total: {apiResponse.response.total}
      </div>
    </>
  );
}

export default OutputTable;
