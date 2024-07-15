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

  const myObj = [
    {
      id: "1",
      platform: "Facebook",
      logo: "facebook.png",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: [
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
        },
      ],
      postComments: [
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
          comment:
            "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
          comment:
            "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
          comment:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
          comment: " Et harum quidem rerum facilis est et expedita distinctio.",
        },
      ],
      shares: [
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
        },
      ],
    },
    {
      id: "2",
      platform: "Instagram",
      logo: "instagram.webp",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      likes: [
        {
          name: "Rohan Rathore",
          username: "rohan21",
          profilePic: "profilePic3.jpeg",
        },
        {
          name: "Jennifer Aniston",
          username: "jeff12",
          profilePic: "laura.webp",
        },
        {
          name: "Saurabh Jain",
          username: "Saurabh45",
          profilePic: "profilePic8.jpeg",
        },
        {
          name: "Cercei Lannistor",
          username: "cercei69",
          profilePic: "profilePic10.jpg",
        },
        {
          name: "Jamie Lam",
          username: "jaim5690",
          profilePic: "profilePic4.webp",
        },
      ],
      postComments: [
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
          comment: " Et harum quidem rerum facilis est et expedita distinctio.",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
          comment:
            "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil",
        },
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
          comment:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
          comment:
            "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
      ],
      shares: [
        {
          name: "Ayush Sinha",
          username: "ay1907",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Chirag Chulbule",
          username: "ch1111",
          profilePic: "profilePic2.webp",
        },
        {
          name: "Shweta Jain",
          username: "shweta45",
          profilePic: "profilePic10.jpg",
        },
        {
          name: "Ashish",
          username: "ashis789",
          profilePic: "profilePic5.jpeg",
        },
        {
          name: "Varun Dwivedi",
          username: "vd1990",
          profilePic: "profilePic7.jpg",
        },
      ],
    },
    {
      id: "3",
      platform: "linkedin",
      logo: "linkedin.webp",
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      likes: [
        {
          name: "Reshma Tiwari",
          username: "resham12",
          profilePic: "profilePic12.jpg",
        },
        {
          name: "Kriti Sharma",
          username: "kr567",
          profilePic: "profilePic10.jpg",
        },
        {
          name: "Shubham Sehgal",
          username: "shuuu70",
          profilePic: "profilePic2.webp",
        },
        {
          name: "Ashish Jain",
          username: "ashis789",
          profilePic: "profilePic7.jpg",
        },
        {
          name: "Keshav Khatri",
          username: "keshaww34",
          profilePic: "profilePic7.jpg",
        },
      ],
      postComments: [
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
          comment:
            "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
          comment:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere",
        },
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
          comment:
            "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
          comment: " Et harum quidem rerum facilis est et expedita distinctio.",
        },
      ],
      shares: [
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
        },
      ],
    },
    {
      id: "4",
      platform: "Twitter",
      logo: "Twitter.webp",
      comment:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      likes: [
        {
          name: "Akash Agrawal",
          username: "aka1907",
          profilePic: "profilePic3.jpeg",
        },
        {
          name: "Rakesh Sharma",
          username: "rk1111",
          profilePic: "profilePic4.webp",
        },
        {
          name: "Saurabh Jain",
          username: "Saurabh45",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Ashish",
          username: "ashis789",
          profilePic: "profilePic7.jpg",
        },
        {
          name: "Vasu Sethi",
          username: "vd1990",
          profilePic: "profilePic4.webp",
        },
      ],
      postComments: [
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
          comment: " Et harum quidem rerum facilis est et expedita distinctio.",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
          comment:
            "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil",
        },
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
          comment:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
          comment:
            "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
      ],
      shares: [
        {
          name: "Reshma Tiwari",
          username: "resham12",
          profilePic: "profilePic12.jpg",
        },
        {
          name: "Kriti Sharma",
          username: "kr567",
          profilePic: "profilePic10.jpg",
        },
        {
          name: "Shubham Sehgal",
          username: "shuuu70",
          profilePic: "profilePic2.webp",
        },
        {
          name: "Ashish Jain",
          username: "ashis789",
          profilePic: "profilePic7.jpg",
        },
        {
          name: "Keshav Khatri",
          username: "keshaww34",
          profilePic: "profilePic7.jpg",
        },
      ],
    },
    {
      id: "5",
      platform: "Mail",
      logo: "mail.webp",
      comment:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      likes: [
        {
          name: "Ayush Sinha",
          username: "ay1907",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Chirag Chulbule",
          username: "ch1111",
          profilePic: "profilePic2.webp",
        },
        {
          name: "Shweta Jain",
          username: "shweta45",
          profilePic: "profilePic10.jpg",
        },
        {
          name: "Ashish",
          username: "ashis789",
          profilePic: "profilePic5.jpeg",
        },
        {
          name: "Varun Dwivedi",
          username: "vd1990",
          profilePic: "profilePic7.jpg",
        },
      ],
      postComments: [
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
          comment:
            "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
          comment:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere",
        },
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
          comment:
            "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
          comment: " Et harum quidem rerum facilis est et expedita distinctio.",
        },
      ],
      shares: [
        {
          name: "Aryan Khan",
          username: "arya29",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Mehak Rathore",
          username: "mehak29",
          profilePic: "profilePic9.jpg",
        },
        {
          name: "Pallavi Singh",
          username: "palluji55",
          profilePic: "profilePic11.jpg",
        },
        {
          name: "Govind Kumar",
          username: "gogovind30",
          profilePic: "profilePic1.jpeg",
        },
        {
          name: "Siddhartha",
          username: "siddd",
          profilePic: "profilePic7.jpg",
        },
      ],
    },
  ];

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
        const response = await axios.get("http://localhost:1880/facebook-feed");
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
    // console.log("Post Caption --- ", posts.data[0].message);
    console.log("Post Image --- ", posts[0].attachments.data[0].media);
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
                                        alt="glatform Picture"
                                        src={`/facebook.png`}
                                        sx={{
                                          width: 50,
                                          height: 50,
                                          backgroundColor: "black",
                                        }}
                                      />
                                      <Typography>Facebook</Typography>
                                    </Grid>
                                    <Typography
                                      sx={{
                                        padding: "1rem",
                                        textAlign: "left",
                                        fontSize: 14,
                                      }}
                                    >
                                      {obj.message}
                                    </Typography>
                                    {/* {
                                      obj.attachments.data[0].media.image.src !== undefined ? 
                                      <Image
                                      src= {obj.attachments.data[0].media.image.src}
                                      width={500}
                                      height={500}
                                      alt="Img"
                                    /> : ""
                                    } */}
                                    {obj.attachments?.data[0]?.media?.image
                                      ?.src ? (
                                        <CardMedia
                                        component="img"
                                        height="190"
                                        width='190'
                                        image= {obj.attachments.data[0].media.image
                                          .src}
                                        alt="Paella dish"
                                        sx = {{marginBottom: 2}}
                                      />
                                    ) : null}
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
