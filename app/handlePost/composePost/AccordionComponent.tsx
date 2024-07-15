"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionSlots,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
  Fade,
  PortraitRoundedIcon,
  Card,
  CardContent,
  CardMedia,
  Person2RoundedIcon,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  ClearRoundedIcon,
  Button,
  BookmarkBorderRoundedIcon
} from '../../Components/muiIcons/muiIcons'

export default function AccordionComponent() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const platformObj = [
    {
      platform: "Twitter",
      logo: "/twitter.webp",
      username: "@Assito376536",
    },
    {
      platform: "Linkedin",
      logo: "/linkedin.webp",
      username: "Assisto Technologies Pvt Ltd",
    },
  ];

  const [checkedPlatforms, setCheckedPlatforms] = useState([]);

  const handlePlatformChange = (platform) => (event) => {
    if (event.target.checked) {
      setCheckedPlatforms([...checkedPlatforms, platform]);
    } else {
      setCheckedPlatforms(
        checkedPlatforms.filter((item) => item.platform !== platform.platform)
      );
    }
    // console.log(platform);
    // console.log(event);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Accordion sx={{ borderRadius: "8px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              {checkedPlatforms == 0 ? (
                <div className="flex justify-between items-center gap-3">
                  <PortraitRoundedIcon />
                  <Typography sx={{ fontSize: "13px", fontWeight: "700" }}>
                    Select your Platform
                  </Typography>
                </div>
              ) : (
                <div className={"flex justify-start items-center gap-2"}>
                  {checkedPlatforms.map((platform) => (
                    <Card
                      sx={{
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        borderRadius: "5px",
                        padding: "5px",
                        gap: "4px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="No img found"
                        style={{ height: "20px", width: "20px" }}
                        image={platform.logo}
                      />
                      <Typography sx={{ fontSize: "12px" }}>
                        {" "}
                        {platform.username.length > 20
                          ? `${platform.username.slice(0, 20)}...`
                          : platform.username}
                      </Typography>
                      {/* <Typography>
                        <ClearRoundedIcon
                          sx={{ fontSize: "15px", margin: "5px" }}
                          onClick={handleCrossBtnClick(platform)}
                        />
                      </Typography> */}
                    </Card>
                  ))}
                </div>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {platformObj.map((platformData, index) => (
                  <Card key={index} sx={{ marginTop: 2, padding: "5px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPlatforms.platform?.includes(
                            platformData
                          )}
                          onChange={handlePlatformChange(platformData)}
                          color="primary"
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 20 },
                          }}
                        />
                      }
                      label={
                        <CardContent>
                          <div className="flex justify-start items-center gap-1">
                            <CardMedia
                              component="img"
                              image={platformData.logo}
                              alt={platformData.platform}
                              sx={{ height: "20px", width: "20px" }}
                            />
                            <Typography sx={{ fontSize: 14 }}>
                              {platformData.platform}
                            </Typography>
                          </div>
                          <Typography sx={{ fontSize: 12 }}>
                            {platformData.username}
                          </Typography>
                        </CardContent>
                      }
                    />
                  </Card>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          <Accordion sx={{ borderRadius: "8px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ color: "black", fontSize: "13px", fontWeight: "700" }}
            >
              <div className="flex justify-between items-center gap-3">
                <BookmarkBorderRoundedIcon />
                <Typography sx={{ fontSize: "13px", fontWeight: "700" }}>
                  Labels
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails >
              <div>
                <Typography
                  sx={{
                    marginTop: "-10px",
                    fontSize: "13px",
                    color: "#757575",
                  }}
                >
                  A great way to organize, filter and report on your content in
                  Assisto
                </Typography>
                <div className="flex justify-between items-center gap-2">
                  <input
                    placeholder="Search Tags"
                    className="w-full border border-black p-2 rounded-md"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#007FFF",
                      fontSize: "10px",
                      borderRadius: "5px",
                      "&:hover": {
                        backgroundColor: "#0000FF",
                      },
                    }}
                  >
                    Add Label
                  </Button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
}
