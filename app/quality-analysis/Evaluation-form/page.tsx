"use client";
import { styled } from "@mui/material/styles";
import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  Box,
  Paper,
  Grid,
  TabContext,
  TabList,
  TabPanel,
  Tab,
  Accordion,
  ExpandMoreIcon,
  AccordionSummary,
  AccordionDetails,
  PlayCircleIcon,
  Avatar,
  Typography
  } from '../../Components/muiIcons/muiIcons';

import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
 
  // maxWidth: 400,
  color: theme.palette.text.primary,
}));

const message = `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX...`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const dummydata = [
  {
    speaker: "John",
    duration: 3.4567,
    audio_chunk_base64: "data:audio/mpeg;base64,//uQxAAADIBAAAAExBTUUz...",
    text:"hello John is here"
  },
  {
    speaker: "Jane",
    duration: 5.1234,
    audio_chunk_base64: "data:audio/mpeg;base64,//uQxAAADIBAAAAExBTUUz...",
     text:"hello Jane is here"
  },
  {
    speaker: "Doe",
    duration: 2.789,
    audio_chunk_base64: "data:audio/mpeg;base64,//uQxAAADIBAAAAExBTUUz...",
    text:"hello Doe is here"
  }
];


export default function Page() {
  const [value, setValue] = React.useState("1");
  const [data, setData] = useState(dummydata);
  const [textStatus, setTextStatus] = useState(false);
  const [text, setText] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const searchParams = useSearchParams();
  const call_id = searchParams.get('call_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
      setLoading(true);
      const response = await axios.post('http://164.52.203.96:9485/get_speaker_audio_chunks',
        { call_id: call_id },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );


      setData(response.data.audio_chunks);
    
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [call_id]);

  const getBase64AudioUrl = (base64Data: any) => {
    const audioType = 'audio/mp3';
    return `data:${audioType};base64,${base64Data}`;
  };

  const showText =(text:any) =>{
    setTextStatus(true)
    setText(text)
  }

  
  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <audio controls style={{ width: "-webkit-fill-available" }}>
                    <source
                      src="https://www.coothead.co.uk/audio/You-Cant-Always-Get-What-You-Want.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="lab API tabs example"
                      >
                        <Tab label="All (63)" value="1" />
                        <Tab label="Found (6)" value="2" />
                        <Tab label="Not Found (57)" value="3" />
                        <Tab label="Partial" value="4" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: "5px" }}>
                      <div>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            Opening
                          </AccordionSummary>
                          <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            Professionalism
                          </AccordionSummary>
                          <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                          >
                            Voice of Customer
                          </AccordionSummary>
                          <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel4-header"
                          >
                            Closing
                          </AccordionSummary>
                          <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item One</TabPanel>
                  </TabContext>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Card sx={{ backgroundColor: "white", padding: "5px" }}>
                  <Grid
                    container
                    spacing={2}
                    sx={{ backgroundColor: "gainsboro", padding: "10px" }}
                  >
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: "700",
                          textAlign: "left",
                        }}
                        color="#000"
                      >
                        Transcript
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: "700",
                          textAlign: "left",
                        }}
                        color="#000"
                      >
                        Duraction:22 min 09 sec
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: "700",
                          textAlign: "left",
                        }}
                        color="#000"
                      >
                        Redact Transcript Text
                      </Typography>
                    </Grid>
                  </Grid>
               
                 <Box
                    sx={(theme) => ({
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      width: "100%",
                      height: 450,
                      "& > div": {
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": {
                          height: 10,
                          WebkitAppearance: "none",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          borderRadius: 8,
                          border: "2px solid",
                          borderColor:
                            theme.palette.mode === "dark" ? "" : "#E7EBF0",
                          backgroundColor: "rgba(0 0 0 / 0.5)",
                        },
                      },
                    })}
                  >
                    <div>
                      <Grid container spacing={3}>
                          <Grid
                           
                            xs={12}
                            sx={{
                              paddingLeft: 4,
                              paddingRight: 2,
                              paddingTop: 4,
                              // paddingBottom: 2
                              }}
                              >
                            <Item>
                                {data.map((chunk:any, index:any) => (
                            <Box
                            sx={{
                              flexGrow: 1,
                              overflow: "hidden",
                              px: 0,
                             
                            }}
                            key={index}
                            onClick={() => {
                              setActiveIndex(index);
                              showText(chunk.text);
                            }}
                          >
                                <Typography
                                  sx={{
                                    fontSize: 13,
                                    fontWeight: "600",
                                    textAlign: "left",
                                  }}
                                  color="#000"
                                >
                                  {chunk.speaker }: {chunk.duration.toFixed(2) } 
                                </Typography>

                                <StyledPaper
                                  sx={{
                                    my: 1,
                                    mx: "auto",
                                    p: 2,
                                    backgroundColor: activeIndex === index ? '#c4c4c4' : 'white', // Change background color when active
                                    // border: activeIndex === index ? '2px solid gainsboro' : 'none', // Add border when active
                                  }}
                                >
                                   <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item >
                                      <Avatar sx={{ backgroundColor: 'black', cursor: 'pointer' }} onClick={() => {
                                        const audioElement = document.getElementById(`audio-${index}`) as HTMLAudioElement;
                                        // event.stopPropagation();
                                        audioElement.play();
                                      }}>
                                        <PlayCircleIcon />
                                      </Avatar>
                                      <audio id={`audio-${index}`} style={{ display: 'none' }}>
                                        <source
                                          src={getBase64AudioUrl(chunk.audio_chunk_base64)}
                                          type="audio/mpeg"
                                        />
                                      </audio>
                                      
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                      <Typography noWrap>
                                        {message}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </StyledPaper>
                              </Box>
                            ))}
                            </Item>
                          </Grid>
                      </Grid>
                    </div>
                  </Box>
                 
                </Card>
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid item  xs={4} spacing={2}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    Total Score :100
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    Fail parameter : 0
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    Grade Assigned: Excellent
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    Evaluation Date:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    Evaluator:
                  </Typography>
                </Item>
              </Grid>





              

              
            </Grid>
          </Item>
          {textStatus &&  <Item sx={{marginTop : 2}}>
          <Grid item xs={12} >
                <Item>
                 
                  <Typography
                    sx={{ fontSize: 15, fontWeight: "600", textAlign: "left" }}
                    color="#000"
                  >
                    {text}
                  </Typography>
                  
                </Item>
              </Grid>
              </Item>}


        </Grid>
      </Grid>
    </Box>
  );
}
