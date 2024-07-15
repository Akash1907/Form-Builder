import * as React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '../../Components/muiIcons/muiIcons';

export default function ImgMediaCard(props: any) {

  return (
    <div className="flex space-x-7 mt-20">
      {/*First card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 300 }} className="mt-10">
        <CardMedia
          component="img"
          alt="No image found"
          style={{ height: 200, width: 200, padding: "10px 10px" }}
          image="/facebook.png"
        />
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            size="large"
            href="https://www.facebook.com/"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Connect
          </Button>
        </CardActions>
      </Card>
      {/*Second card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 300 }} className="mt-10">
        <CardMedia
          component="img"
          alt="No img found"
          style={{ height: 200, width: 200, padding: "10px 10px" }}
          image="/instagram.webp"
        />
        <CardContent></CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            size="large"
            href="https://www.instagram.com/"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Connect
          </Button>
        </CardActions>
      </Card>
      {/* Third Card */}
      <Card sx={{ maxWidth: 250, maxHeight: 300 }} className="mt-10">
        <CardMedia
          component="img"
          alt="No img found"
          style={{ height: 200, width: 200, padding: "10px 10px" }}
          image="/twitter.webp"
        />
        <CardContent></CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            size="large"
            href="https://x.com/"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Connect
          </Button>
        </CardActions>
      </Card>
      {/* Fourth Card */}
      <Card sx={{ maxWidth: 250, maxHeight: 300 }} className="mt-10">
        <CardMedia
          component="img"
          alt="No img found"
          style={{ height: 200, width: 200, padding: "10px 10px" }}
          image="/linkedin.webp"
        />
        <CardContent></CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            size="large"
            href="https://www.linkedin.com/"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Connect
          </Button>
        </CardActions>
      </Card>
      {/* Fourth Card */}
      <Card sx={{ maxWidth: 250, maxHeight: 300 }} className="mt-10">
        <CardMedia
          component="img"
          alt="No img found"
          style={{ height: 200, width: 200, padding: "10px 10px" }}
          image="/mail.webp"
        />
        <CardContent></CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            size="large"
            href="mailto:akash.rnc1@outlook.com"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Connect
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
