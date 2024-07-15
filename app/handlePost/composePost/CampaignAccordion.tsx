
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
  Card,
  CardContent,
  Divider
} from '../../Components/muiIcons/muiIcons';
export default function CampaignAccordion() {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Campaign</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography
              sx={{
                marginTop: "-10px",
                fontSize: "13px",
                color: "#757575",
              }}
            >
              Track and report on your social marketing Campaign Planner, notes
              and much more.
            </Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>No Tags Found</Typography>
            </Box>
            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
            <Typography
              sx={{
                color: "rgb(17, 80, 170)",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Create a new Campaign
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
