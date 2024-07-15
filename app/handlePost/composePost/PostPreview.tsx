
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  ChatBubbleOutlineRoundedIcon,
  RepeatRoundedIcon,
  FavoriteBorderRoundedIcon,
  ThumbUpAltRoundedIcon,
  ReplyAllRoundedIcon,
  ModeCommentRoundedIcon
} from '../../Components/muiIcons/muiIcons'

export default function PostPreview() {
  const formatDate = () => {
    const date = new Date();
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const myString =
    "dfdgd";

  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F3F4F4" }}>
      <Box sx={{ paddingX: 6, paddingY: 4 }}>
        <Box>
          <Typography sx={{ fontWeight: 700 }}>Post Preview</Typography>
          <Box>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: 13,
                color: "#7D7D7D",
                marginTop: 2,
              }}
            >
              Preview approximates how your content will display when published.
              Tests and updates by social networks may affect the final
              appearance.
            </Typography>
          </Box>
        </Box>
        {myString.length === 0 ? (
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#7D7D7D", marginBottom: 2 }}>
              Select a profile and start adding content in the left panel.
            </Typography>
            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "felx-start",
                  alignItems: "start",
                  padding: 2,
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#DEE1E1",
                    borderRadius: "50%",
                    margin: "10px",
                  }}
                />
                <Box>
                  <div
                    style={{
                      width: "100px",
                      height: "25px",
                      backgroundColor: "#DEE1E1",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "300px",
                      height: "25px",
                      backgroundColor: "#DEE1E1",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "300px",
                      height: "25px",
                      backgroundColor: "#DEE1E1",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "200px",
                      height: "25px",
                      backgroundColor: "#DEE1E1",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "300px",
                      height: "200px",
                      backgroundColor: "#DEE1E1",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box>
              <Divider sx={{ marginTop: 2 }} />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: "30px",
                    width: "30px",
                  }}
                  alt="The house from the offer."
                  src="/twitter.webp"
                />
                <Typography>X</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    display: "inline-flex",
                    paddingY: 2,
                    paddingLeft: 3,
                    paddingRight: 4,
                    borderRadius: "5px",
                    // height: "120px",
                    width: "350px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "start",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="No img found"
                      style={{ height: "40px", width: "40px" }}
                      image="/blankProfilePic.png"
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          Assisto
                        </Typography>
                        <Typography
                          sx={{
                            color: "#7D7D7D",
                            fontWeight: "400",
                            fontSize: "12px",
                          }}
                        >
                          @Assisto376536 .
                        </Typography>
                        <Typography
                          sx={{
                            marginLeft: -0.5,
                            fontWeight: "100",
                            fontSize: "12px",
                          }}
                        >
                          {formatDate()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "500", fontSize: "14px" }}
                        >
                          {myString}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          marginTop: 2,
                        }}
                      >
                        <ChatBubbleOutlineRoundedIcon
                          sx={{ color: "#7D7D7D", fontSize: "18px" }}
                        />
                        <RepeatRoundedIcon
                          sx={{ color: "#7D7D7D", fontSize: "18px" }}
                        />
                        <FavoriteBorderRoundedIcon
                          sx={{ color: "#7D7D7D", fontSize: "18px" }}
                        />
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            </Box>
            <Box>
              <Divider sx={{ marginTop: 2 }} />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: "30px",
                    width: "30px",
                  }}
                  alt="Twitter"
                  src="/linkedin.webp"
                />
                <Typography>Linkedin</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    borderRadius: "5px",
                    // height: "200px",
                    width: "350px",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        paddingY: 2,
                        paddingLeft: 3,
                        paddingRight: 4,
                        borderRadius: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "start",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="No img found"
                          style={{ height: "40px", width: "40px" }}
                          image="/blankProfilePic.png"
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "start",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "black",
                                fontWeight: "700",
                                fontSize: "14px",
                              }}
                            >
                              Assisto Technologies Pvt Ltd.
                            </Typography>
                            <Typography
                              sx={{
                                marginLeft: -0.5,
                                fontWeight: "100",
                                fontSize: "12px",
                              }}
                            >
                              {formatDate()}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>
                    <Box>
                      <CardContent>
                        <Box sx={{}}>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: "500",
                                fontSize: "14px",
                                marginLeft: 1,
                              }}
                            >
                              {myString}
                            </Typography>
                          </Box>
                          <Divider sx={{ marginY: 2 }} />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 2,
                              marginTop: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <ThumbUpAltRoundedIcon
                                sx={{ color: "#7D7D7D", fontSize: "18px" }}
                              />
                              <Typography>Like</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <ModeCommentRoundedIcon
                                sx={{ color: "#7D7D7D", fontSize: "18px" }}
                              />
                              <Typography>Comment</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <ReplyAllRoundedIcon
                                sx={{ color: "#7D7D7D", fontSize: "18px" }}
                              />
                              <Typography>Share</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
