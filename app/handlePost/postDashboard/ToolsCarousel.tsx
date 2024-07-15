"use client";

import React, { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const tools = [
  {
    title: "Content Labels",
    desc: "Label your post to early monitor what is or isn't wprking for ypuor audience",
  },
  {
    title: "Asset Library",
    desc: "One place to store all your assests as your posts across multiple networks",
  },
  {
    title: "Approval workflows",
    desc: "Stramline approval on workflows before they're published",
  },
  {
    title: "Social Listening",
    desc: "Get the insights to deliver world class business stratergies",
  },
  {
    title: "Ad campaign insights",
    desc: "Analyze and improve your ad campaign on social",
  },
  {
    title: "Inbox Activity Report",
    desc: "See how quickly you're responding to people engaging with your profits",
  },
];

const ToolsCarousel = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      top: 0,
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      top: 0,
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative", marginTop: 2 }}>
      <IconButton
        onClick={scrollLeft}
        sx={{ position: "absolute", left: 0, zIndex: 1 }}
      >
        <ArrowBackIos />
      </IconButton>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          width: "100%",
        }}
      >
        {tools.map((tool, index) => (
          <Card key={index} sx={{ minWidth: "250px", marginRight: 2, padding: 3}}>
            <Box sx={{ textAlign: "center", mt: 1 }}>{tool.title}</Box>
            <Box sx={{ textAlign: "center", mt: 1, fontSize: 12 }}>{tool.desc}</Box>
          </Card>
        ))}
      </Box>
      <IconButton
        onClick={scrollRight}
        sx={{ position: "absolute", right: 0, zIndex: 1 }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default ToolsCarousel;
