"use client";

import {styled } from "@mui/system";
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
  LoadingButton,
  DeleteOutlinedIcon,
  DownloadOutlinedIcon,
  EditOutlinedIcon,
  VisibilityOutlinedIcon,
} from '../Components/muiIcons/muiIcons';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cards() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  function handleLoading(btnName: string) {
    setLoading({ ...loading, [btnName]: true });
  }
  const isDarkMode = theme.palette.mode === "dark";

  const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    minWidth: "275px",
    padding: theme.spacing(1),
    // background: theme.palette.background.paper,
    margin: theme.spacing(1),

    "&:hover": {
      border: "1px solid hsla(0, 0%, 60%, 0.6)",
      "&::before": {
        transform: `scale(1.6) translate(-10%,-50%) rotate(${
          Math.random() < 0.5
            ? Math.floor(Math.random() * 45) + 45
            : Math.floor(Math.random() * 45) - 90
        }deg)`,
        filter: isDarkMode
          ? " brightness(0.6) contrast(2) saturate(2)"
          : "saturate(2)",
        transition: "all 0.5s cubic-bezier(0,0,.06,1.42)",
        opacity: 0.8,
      },
    },
    "&::before": {
      content: '""',
      transition: "all 1s cubic-bezier(0,0,.06,1.42)",
      position: "absolute",
      top: "50%",
      right: "1rem",
      transform: `translate(-10%,-50%) rotate(-30deg)`,
      width: "8rem",
      height: "8rem",
      backgroundSize: "cover",
      filter: isDarkMode
        ? " brightness(0.45) contrast(2) saturate(2)"
        : "saturate(1)",
      opacity: isDarkMode ? "0.2" : "0.4",
      borderRadius: "2rem",
      zIndex: -1,
    },
  }));

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
            <StyledCard
              sx={{ "&::before": {backgroundImage: `${card.backgroundImage}`}}}
            >
              <CardContent sx={{ zIndex: 2 }}>
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
                  mt: 5,
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
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const cards = [
  {
    projectName: "Sales Dashboard",
    reportId: "59",
    reportName: "Monthly Sales Report",
    backgroundImage: `url(/svg-shapes/shape-${Math.floor(
      Math.random() * 123 + 1
    )}.svg) `,
  },
  {
    projectName: "Customer Analytics",
    reportId: "423",
    reportName: "Customer Segmentation",
    backgroundImage: `url(/svg-shapes/shape-${Math.floor(
      Math.random() * 123 + 1
    )}.svg) `,
  },
  {
    projectName: "Inventory Management",
    reportId: "74",
    reportName: "Stock Levels Analysis",
    backgroundImage: `url(/svg-shapes/shape-${Math.floor(
      Math.random() * 123 + 1
    )}.svg) `,
  },
  {
    projectName: "Marketing Campaign",
    reportId: "84",
    reportName: "ROI Analysis",
    backgroundImage: `url(/svg-shapes/shape-${Math.floor(
      Math.random() * 123 + 1
    )}.svg) `,
  },
  {
    projectName: "Website Performance",
    reportId: "193",
    reportName: "Conversion Rate Optimization",
    backgroundImage: `url(/svg-shapes/shape-${Math.floor(
      Math.random() * 123 + 1
    )}.svg) `,
  },
];
