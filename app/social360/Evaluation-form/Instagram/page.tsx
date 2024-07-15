"use client";

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Grid,
  Divider,
  TabContext,
  TabList,
  TabPanel,
  Tab,
  Container,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  SendRoundedIcon,
  ReplyRoundedIcons,
  Button,
  FavoriteRoundedIcon,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  PlayCircleIcon,
  InsertCommentRoundedIcon,
  CardMedia,
  styled,
  padding,
  textAlign,
} from "../../../Components/muiIcons/muiIcons";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Page() {
  const [value, setValue] = React.useState("1");
  const [clientId, setClientId] = useState<string | string[] | undefined>(
    undefined
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [selectedData, setSelectedData] = useState<>([]);
  const [btnClick, setBtnClick] = useState<>("");
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

  const handleButtonClick = (value, data, index) => {
    setSelectedData(data);
    setBtnClick(value);
    setSelectedBoxIndex(index);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1880/instagram-media"
        );
        setPosts(response.data.data);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const show = () => {
    console.log("posts", posts);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <Grid container spacing={2}>
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
                <Card sx={{ padding: "5px" }}>
                  <Grid
                    container
                    sx={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Grid item>
                      <Avatar
                        alt="Profile Picture"
                        src="/laura.webp"
                        sx={{ width: 70, height: 70 }}
                      />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: "700",
                            textAlign: "left",
                          }}
                        >
                          Sarah Wilson
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            textAlign: "left",
                          }}
                        >
                          laura@1999
                        </Typography>
                      </Box>
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
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#888",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "#555",
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
                            paddingBottom: 5,
                          }}
                        >
                          {posts.map((obj, index) => {
                            return (
                              <Box
                                key={index}
                                sx={{
                                  flexGrow: 1,
                                  overflow: "hidden",
                                  px: 0,
                                }}
                              >
                                <StyledPaper
                                  sx={{
                                    my: 1,
                                    mx: "auto",
                                    p: 2,
                                    backgroundColor:
                                      selectedBoxIndex === index
                                        ? "#7d8188"
                                        : "none",
                                  }}
                                >
                                  <Grid
                                    container
                                    wrap="nowrap"
                                    spacing={2}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "",
                                      alignItems: "flex-start",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <Grid
                                      item
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "1rem",
                                      }}
                                    >
                                      <Avatar
                                        alt="platform Picture"
                                        src={`/instagram.webp`} 
                                        sx={{
                                          width: 50,
                                          height: 50,
                                          backgroundColor: "black",
                                        }}
                                      />
                                      <Typography>Instagram</Typography>
                                    </Grid>
                                    <Typography
                                      sx={{
                                        padding: "1rem",
                                        textAlign: "left",
                                        fontSize: 14,
                                      }}
                                    >
                                      {obj.caption}
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="190"
                                        width="190"
                                        image={
                                          obj.media_url
                                        }
                                        alt="post"
                                        sx={{ marginBottom: 2 }}
                                      />
                                  </Grid>
                                  <Grid
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      gap: "1rem",
                                    }}
                                  >
                                    <Button
                                      value="Likes"
                                      onClick={() =>
                                        handleButtonClick(
                                          "Likes",
                                          obj.likes,
                                          index
                                        )
                                      }
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          gap: "0.3rem",
                                        }}
                                      >
                                        <FavoriteRoundedIcon />
                                        <Typography>Likes</Typography>
                                      </Box>
                                    </Button>
                                    <Button>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          gap: "0.3rem",
                                        }}
                                        onClick={() =>
                                          handleButtonClick(
                                            "Comments",
                                            obj.postComments,
                                            index
                                          )
                                        }
                                      >
                                        <InsertCommentRoundedIcon />
                                        <Typography>Comments</Typography>
                                      </Box>
                                    </Button>
                                    <Button>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          gap: "0.3rem",
                                        }}
                                        onClick={() =>
                                          handleButtonClick(
                                            "Shares",
                                            obj.shares,
                                            index
                                          )
                                        }
                                      >
                                        <SendRoundedIcon />
                                        <Typography>Shares</Typography>
                                      </Box>
                                    </Button>
                                  </Grid>
                                </StyledPaper>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </div>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={4}>
          {selectedData.length > 0 ? (
            <Item>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 2,
                  borderRadius: "4px",
                  height: 530,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                <Typography variant="h6">{btnClick}</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {selectedData.map((data, index) => (
                  <Item sx={{ marginBottom: "1rem" }}>
                    <Box
                      key={index}
                      sx={{
                        marginBottom: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt={data.name}
                          src={`/${data.profilePic}`}
                          sx={{ marginRight: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">{data.name}</Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              fontSize: 12,
                              textAlign: "left",
                            }}
                          >
                            {data.username}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {btnClick === "Comments" ? (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ textAlign: "left", marginTop: "1rem" }}
                          >
                            {data.comment}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </Item>
                ))}
              </Box>
            </Item>
          ) : (
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              Nothing to Show
              <button onClick={show}>click</button>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
