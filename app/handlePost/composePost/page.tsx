
import EnterPostSection from "./EnterPostSection";
import CampaignAccordion from "./CampaignAccordion";
import PostSchedule from "./PostSchedule";
import AccordionComponent from "./AccordionComponent";
import PostPreview from "./PostPreview";
import {
  Grid,
  Box,
  Typography,
  Divider,
} from '../../Components/muiICons/muiIcons';
export default function page() {
  return (
    <Box sx = {{marginTop: 2}}>
      <Box>
        <Typography sx = {{fontWeight: "800", marginLeft: 2}}>Create New Post</Typography>
        <Divider sx={{ paddingTop: 3 }} />
      </Box>
      <Grid container xs={12}>
        <Grid item xs={6}>
          <Box sx = {{ marginLeft: 2 }}>
            <AccordionComponent  />
            <EnterPostSection/>
            <CampaignAccordion/>
            <PostSchedule />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <PostPreview />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
