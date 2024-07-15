"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Typography,
  Button,
  useTheme,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Grid,
  DeleteOutlinedIcon,
  DownloadOutlinedIcon,
  EditOutlinedIcon,
  VisibilityOutlinedIcon,
} from '../Components/muiIcons/muiIcons';
import StickyHeadTable from "../Components/table/page";
const jsonData = [
  {
      "Product_id": 101,
      "Product_name": "Product 1",
      "Category": "Electronics",
      "Unit_price": 595.2,
      "Quantity_In_stock": 162,
      "Total_Amount": 96423.04,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 102,
      "Product_name": "Product 2",
      "Category": "Machinery",
      "Unit_price": 449.9,
      "Quantity_In_stock": 147,
      "Total_Amount": 66135.66,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 103,
      "Product_name": "Product 3",
      "Category": "Electronics",
      "Unit_price": 208.81,
      "Quantity_In_stock": 187,
      "Total_Amount": 39046.96,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 104,
      "Product_name": "Product 4",
      "Category": "Machinery",
      "Unit_price": 536.77,
      "Quantity_In_stock": 118,
      "Total_Amount": 63338.71,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 105,
      "Product_name": "Product 5",
      "Category": "Tools",
      "Unit_price": 240.78,
      "Quantity_In_stock": 108,
      "Total_Amount": 26003.83,
      "Supplier_ID": "Supplier 3"
  },
  {
      "Product_id": 106,
      "Product_name": "Product 6",
      "Category": "Wooden",
      "Unit_price": 276.09,
      "Quantity_In_stock": 222,
      "Total_Amount": 61292.19,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 107,
      "Product_name": "Product 7",
      "Category": "Wooden",
      "Unit_price": 43.11,
      "Quantity_In_stock": 217,
      "Total_Amount": 9355.9,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 108,
      "Product_name": "Product 8",
      "Category": "Machinery",
      "Unit_price": 50.53,
      "Quantity_In_stock": 146,
      "Total_Amount": 7377.77,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 109,
      "Product_name": "Product 9",
      "Category": "Machinery",
      "Unit_price": 407.17,
      "Quantity_In_stock": 121,
      "Total_Amount": 49267.26,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 110,
      "Product_name": "Product 10",
      "Category": "Electronics",
      "Unit_price": 5.59,
      "Quantity_In_stock": 213,
      "Total_Amount": 1191.12,
      "Supplier_ID": "Supplier 3"
  },
  {
      "Product_id": 111,
      "Product_name": "Product 11",
      "Category": "Electronics",
      "Unit_price": 142.2,
      "Quantity_In_stock": 216,
      "Total_Amount": 30715.6,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 112,
      "Product_name": "Product 12",
      "Category": "Machinery",
      "Unit_price": 31.01,
      "Quantity_In_stock": 104,
      "Total_Amount": 3225.24,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 113,
      "Product_name": "Product 13",
      "Category": "Wooden",
      "Unit_price": 305.43,
      "Quantity_In_stock": 102,
      "Total_Amount": 31153.65,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 114,
      "Product_name": "Product 14",
      "Category": "Tools",
      "Unit_price": 373.23,
      "Quantity_In_stock": 227,
      "Total_Amount": 84722.62,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 115,
      "Product_name": "Product 15",
      "Category": "Electronics",
      "Unit_price": 488.92,
      "Quantity_In_stock": 182,
      "Total_Amount": 88984.21,
      "Supplier_ID": "Supplier 2"
  },
  {
      "Product_id": 116,
      "Product_name": "Product 16",
      "Category": "Electronics",
      "Unit_price": 172.77,
      "Quantity_In_stock": 206,
      "Total_Amount": 35590.52,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 117,
      "Product_name": "Product 17",
      "Category": "Tools",
      "Unit_price": 27,
      "Quantity_In_stock": 129,
      "Total_Amount": 3483.54,
      "Supplier_ID": "Supplier 3"
  },
  {
      "Product_id": 118,
      "Product_name": "Product 18",
      "Category": "Tools",
      "Unit_price": 453.01,
      "Quantity_In_stock": 129,
      "Total_Amount": 58438.34,
      "Supplier_ID": "Supplier 3"
  },
  {
      "Product_id": 119,
      "Product_name": "Product 19",
      "Category": "Machinery",
      "Unit_price": 411.42,
      "Quantity_In_stock": 179,
      "Total_Amount": 73643.62,
      "Supplier_ID": "Suppier 1 "
  },
  {
      "Product_id": 120,
      "Product_name": "Product 20",
      "Category": "Machinery",
      "Unit_price": 72.23,
      "Quantity_In_stock": 196,
      "Total_Amount": 14158.02,
      "Supplier_ID": "Supplier 2"
  }
]
export default function Cards() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  function handleLoading(btnName: string) {
    setLoading({ ...loading, [btnName]: true });
  }
  const handleView = (reportName: string) => {
    handleLoading(reportName);
    setTimeout(() => {
      if (typeof window === "undefined") return;
      const formattedReportName = reportName.toLowerCase().replace(/\s+/g, "-");
      const url = `/Components/report/${formattedReportName}`;
      router.push(url);
    }, 1000);
  };
  return (
    <div className="flex justify-center">
      <Grid container justifyContent={"start"}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <Card sx={{ minWidth: 275, p: 1, m: 1 }}>
              <CardContent>
                <Typography variant="h6" marginBlockEnd={1}>
                  {card.reportName}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label={card.projectName} variant="outlined" />
                </Stack>
              </CardContent>
              <div className="mt-5"></div>
              <CardActions
                sx={{
                  m: 0,
                  p: 0,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
              <Tooltip title="View">
                  <span>
                    <LoadingButton
                      loading={loading[card.reportName]}
                      loadingPosition="start"
                      onClick={() => handleView(card.reportName)}
                      variant={"text"}
                      sx={{
                        "& .MuiLoadingButton-loadingIndicator": {
                          // Add a colon here
                          margin: theme.spacing(-1),
                        },
                      }}
                    >
                      <VisibilityOutlinedIcon />
                    </LoadingButton>
                  </span>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button size="small" variant={"text"}>
                    <EditOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Download">
                  <Button size="small" variant={"text"}>
                    <DownloadOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button size="small" variant={"text"}>
                    <DeleteOutlinedIcon />
                  </Button>
                </Tooltip>
              </CardActions>

            </Card>
          </Grid>
        ))}
            {StickyHeadTable(jsonData)}
      </Grid>
  
    </div>
  );
}

const cards = [
  {
    projectName: "Sales Dashboard",
    reportName: "Monthly Sales Report",
    backgroundImage: "path/to/image1.jpg",
  },
  {
    projectName: "Customer Analytics",
    reportName: "Customer Segmentation",
    backgroundImage: "path/to/image2.jpg",
  },
  {
    projectName: "Inventory Management",
    reportName: "Stock Levels Analysis",
    backgroundImage: "path/to/image3.jpg",
  },
  {
    projectName: "Marketing Campaign",
    reportName: "ROI Analysis",
    backgroundImage: "path/to/image4.jpg",
  },
  {
    projectName: "Website Performance",
    reportName: "Conversion Rate Optimization",
    backgroundImage: "path/to/image5.jpg",
  },
];
