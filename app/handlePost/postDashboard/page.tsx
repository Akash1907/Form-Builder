'use client'

// import {useState} from 'react';
import ToolsCarousel from "./ToolsCarousel";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material";
import Divider from "@mui/material/Divider";
import Image from "mui-image";
import Button from "@mui/material/Button";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useRouter } from 'next/navigation'

export default function page() {

  const router = useRouter()

  return (
    <div>
      <ToolsCarousel />
      <Typography sx={{ marginTop: 5 }}>Your Latest Activity</Typography>
      <div className="flex justify-between items-center pb-8">
        <div>
          <Card
            sx={{
              maxWidth: "300px",
              minHeight: "300px",
              marginTop: 2,
              padding: 1,
            }}
          >
            <CardContent sx={{ textAlign: "left" }}>
              Today's Publishing
            </CardContent>
            <Divider sx={{ marginBottom: 2 }} />
            <div className="flex justify-center items-center flex-col ">
              <CardMedia
                component="img"
                alt="No img found"
                style={{ height: 50, width: 50 }}
                image="/publish.png"
              />
              <Typography sx={{ marginTop: 3 }}>
                Publish your first post.
              </Typography>
              <Typography
                sx={{ textAlign: "center", padding: 1, fontSize: "12px" }}
              >
                You can publish, schedule or reach your audience at the accurate
                time.
              </Typography>
                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => router.push('/handlePost/composePost')}>
                  Compose Post
                </Button>
            </div>
            <div className={"mt-5"}>
              <CardContent sx={{ textAlign: "left" }}>To Do</CardContent>
              <Divider sx={{ marginBottom: 2 }} />
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <CardContent>
                    <PushPinRoundedIcon />
                  </CardContent>
                  <CardContent>0</CardContent>
                </div>
                <Link href="#" sx={{ color: "#0C3F89" }}>
                  <CardContent>Go to Cases</CardContent>
                </Link>
              </div>
              <Divider sx={{ marginBottom: 2 }} />
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <CardContent>
                    <CheckCircleOutlineRoundedIcon />
                  </CardContent>
                  <CardContent>0</CardContent>
                </div>
                <Link href="#" variant="body2" sx={{ color: "#0C3F89" }}>
                  <CardContent>Open Approvals</CardContent>
                </Link>
              </div>
              <Divider sx={{ marginBottom: 2 }} />
              <div className="flex justify-center items-center">
                <Button variant="outlined" sx={{ marginTop: 2 }}>
                  You have new messages!
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card sx={{ width: "840px", minHeight: "550px", marginTop: 2 }}>
            <div className={"flex justify-between items-center mt-1"}>
              <CardContent sx={{ marginTop: "8px" }}>
                Your Recent Posts
              </CardContent>
              <div>
                <CardContent>Sort</CardContent>
              </div>
            </div>
            <Divider sx={{ marginBottom: 2 }} />
            <div className="flex justify-center items-center mt-20">
              <center>
                <div className="">
                  <Typography
                    sx={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      textAlign: "center",
                    }}
                  >
                    Easily compare your top performing posts by all the insights
                    available after you start posting at least 3 posts a week
                  </Typography>
                  <Divider
                    sx={{
                      marginBottom: 2,
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 3,
                    }}
                  />
                  <Typography>
                    Discover more ways to{" "}
                    <Link href="#" sx={{ color: "#0C3F89" }}>
                      level-up
                    </Link>{" "}
                    your content strategy
                  </Typography>
                </div>
              </center>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
